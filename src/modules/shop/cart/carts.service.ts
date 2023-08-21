import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CartExpectionKeys,
  ExceptionStatusKeys,
  ProductExceptionKeys,
} from 'src/enums';
import { UserPayload, CartProduct } from 'src/interfaces';
import {
  Cart,
  CartDocument,
  Product,
  ProductDocument,
  User,
  UserDocument,
} from 'src/schemas';
import { ExceptionService } from 'src/shared';
import { CartDto, ProductIdDto } from '../dtos';

@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private exceptionService: ExceptionService,
  ) {}

  async getCurrentCart(userPayload: UserPayload) {
    const user = await this.userModel.findOne({ _id: userPayload._id });

    if (user && !user.cartID) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.Conflict,
        'User has to create cart first',
        CartExpectionKeys.UserDontHaveCart,
      );
    }

    const cart = await this.cartModel.findOne({ _id: user.cartID });
    return cart;
  }

  async createCartWithProduct(userPayload: UserPayload, body: CartDto) {
    const user = await this.userModel.findOne({ _id: userPayload._id });

    if (user && user.cartID) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        'User already created cart, use patch endpoint',
        CartExpectionKeys.UserCartAlreadyExists,
      );
    }

    const product = await this.productModel.findOne({ _id: body.id });

    if (!product) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.NotFound,
        `Product with ${body.id} id not found`,
        ProductExceptionKeys.ProductNotFound,
      );
    }

    if (product.stock < body.quantity) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `Product stock is outnumbered, product have only ${product.stock} item in stock`,
        ProductExceptionKeys.ProductStockOutnumbered,
      );
    }

    const cart = await this.cartModel.create({
      userId: userPayload._id,
      createdAt: new Date().toISOString(),
      total: {
        price: {
          current: product.price.current * body.quantity,
          beforeDiscount: product.price.beforeDiscount * body.quantity,
        },
        quantity: body.quantity,
        products: 1,
      },
      products: [
        {
          quantity: body.quantity,
          pricePerQuantity: product.price.current,
          beforeDiscountPrice: product.price.beforeDiscount,
          productId: body.id,
        },
      ],
    });

    user.cartID = cart.id;
    await user.save();

    return cart;
  }

  async updateCart(userPayload: UserPayload, body: CartDto) {
    const user = await this.userModel.findOne({ _id: userPayload._id });

    if (user && !user.cartID) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.Conflict,
        'User has to create cart first',
        CartExpectionKeys.UserDontHaveCart,
      );
    }

    const product = await this.productModel.findOne({ _id: body.id });

    if (!product) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.NotFound,
        `Product with ${body.id} id not found`,
        ProductExceptionKeys.ProductNotFound,
      );
    }

    if (product.stock < body.quantity) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        `Product stock is outnumbered, product have only ${product.stock} item in stock`,
        ProductExceptionKeys.ProductStockOutnumbered,
      );
    }

    const cart = await this.cartModel.findOne({ _id: user.cartID });
    const itemIndex = cart.products.findIndex(
      (product) => product.productId === body.id,
    );

    if (itemIndex === -1) {
      cart.products.push({
        quantity: body.quantity,
        pricePerQuantity: product.price.current,
        productId: product.id,
        beforeDiscountPrice: product.price.beforeDiscount,
      });
    } else {
      if (body.quantity <= 0) {
        cart.products.splice(itemIndex, 1);
      } else {
        cart.products[itemIndex].quantity = body.quantity;
      }
    }

    cart.total = this.calculateCartTotal(cart.products);

    await cart.save();
    return cart;
  }

  async deleteCartItem(userPayload: UserPayload, body: ProductIdDto) {
    const user = await this.userModel.findOne({ _id: userPayload._id });

    if (user && !user.cartID) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.Conflict,
        'User has to create cart first',
        CartExpectionKeys.UserDontHaveCart,
      );
    }

    const product = await this.productModel.findOne({ _id: body.id });

    if (!product) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.NotFound,
        `Product with ${body.id} id not found`,
        ProductExceptionKeys.ProductNotFound,
      );
    }

    const cart = await this.cartModel.findOne({ _id: user.cartID });

    const productIndex = cart.products.findIndex(
      (product) => product.productId === body.id,
    );

    if (productIndex === -1) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.NotFound,
        `Cart doesn't have item with this ${body.id} id`,
        CartExpectionKeys.CartDontHaveThisItem,
      );
    }

    cart.products.splice(productIndex, 1);
    cart.total = this.calculateCartTotal(cart.products);

    await cart.save();
    return cart;
  }

  private calculateCartTotal(products: CartProduct[]) {
    return {
      price: {
        current: products.reduce((prev, curr) => {
          return prev + curr.pricePerQuantity * curr.quantity;
        }, 0),
        beforeDiscount: products.reduce((prev, curr) => {
          return prev + curr.beforeDiscountPrice * curr.quantity;
        }, 0),
      },
      quantity: products.reduce((prev, curr) => {
        return prev + curr.quantity;
      }, 0),
      products: products.length,
    };
  }

  async clearCart(userPayload: UserPayload) {
    const user = await this.userModel.findOne({ _id: userPayload._id });

    if (user && !user.cartID) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.Conflict,
        'User has to create cart first',
        CartExpectionKeys.UserDontHaveCart,
      );
    }

    const cart = await this.cartModel.findOneAndDelete({ _id: user.cartID });

    if (!cart) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.BadRequest,
        'User cart already was deleted',
        CartExpectionKeys.CartAlreadyDeleted,
      );
    }

    user.cartID = '';
    await user.save();

    return { success: true };
  }

  async checkout(userPayload: UserPayload) {
    // TODO: do we need to verify payment ? like adding card and it's validation
    const user = await this.userModel.findOne({ _id: userPayload._id });

    if (user && !user.cartID) {
      this.exceptionService.throwError(
        ExceptionStatusKeys.NotFound,
        "User doesn't have cart",
        CartExpectionKeys.UserDontHaveCart,
      );
    }

    const cart = await this.cartModel.findOne({ _id: user.cartID });
    const cacheOfProducts = [];
    let total = 0;
    cart.products.forEach(async (doc, index) => {
      const product = await this.productModel.findOne({ _id: doc.productId });
      if (product) {
        const productStock = product.stock;
        product.stock -= doc.quantity;
        if (product.stock < 0) {
          this.exceptionService.throwError(
            ExceptionStatusKeys.Conflict,
            `Product with this ${doc.productId} id, already sold some items, currently can't checkout becouse product have ${productStock} and user want's ${doc.quantity}`,
            ProductExceptionKeys.ProductStockSoldBeforeCheckout,
          );
          return;
        }
        total += doc.quantity;
        cacheOfProducts.push(product);
      }
      if (index + 1 === cart.products.length) {
        cacheOfProducts.forEach(async (item) => {
          await this.productModel.findOneAndUpdate(
            { _id: item.id },
            { stock: item.stock },
          );
        });
      }
    });
    user.cartID = '';
    await user.save();
    await cart.deleteOne();
    return {
      success: true,
      message: `Stocks were updated, currently ${total} item were sold. Cart will be cleared, user have to create new cart with POST request`,
    };
  }
}
