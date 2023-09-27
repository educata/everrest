# Cart

In the cart module, users can create a cart, add products to it, proceed to checkout, delete items, and clear the cart. This operates in a simple manner, similar to how it is handled on shopping websites.

## Workflow

<img src="./public/flowchart.svg" alt="flowchart of cart module">

To use the cart module, we must follow a workflow similar to the provided flowchart. First of all, a user needs to create a cart by <a href="#create-cart">Create cart</a>. Then, the user is allowed to check the cart at any time by <a href="#get-cart">Get cart</a>. After that, if the user wants to add a new product to the cart, they should use the <a href="#update-cart">Update cart</a> option. There may be moments when the user wants to clear the cart, for this action, we will use the <a href="#clear-cart">Clear cart</a> option. If the user wants to remove an item from the cart, we should use the <a href="#delete-cart">Delete cart</a> option. Finally, if the user wants to proceed to checkout, we should use the <a href="#checkout">Checkout</a> option.

::: info NOTE
All endpoints for the cart module require the user to be `authorized`. This means that an access token must be attached either to cookies or the `Authorization` header.
:::