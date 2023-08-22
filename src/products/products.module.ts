import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmExModule } from '../typeorm-ex/typeorm-ex.module';
import { ProductRepository } from './repository/product.repository';

@Module({
  exports: [ProductsService],
  imports: [TypeOrmExModule.forCustomRepository([ProductRepository])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
