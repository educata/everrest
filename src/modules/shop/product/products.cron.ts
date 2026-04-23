import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ProductsService } from './products.service';

@Injectable()
export class ProductsCron {
  private readonly logger = new Logger(ProductsCron.name);

  constructor(private readonly productsService: ProductsService) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async restockAll() {
    const result = await this.productsService.restockAll(100);
    this.logger.log(
      `Monthly restock complete: ${result.modifiedCount} products set to 100`,
    );
  }
}
