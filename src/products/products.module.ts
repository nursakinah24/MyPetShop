import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmExModule } from '../typeorm-ex/typeorm-ex.module';
import { ProductRepository } from './repository/product.repository';
import { IsAdminGuard } from 'src/guard/role.guard';

@Module({
  exports: [ProductsService],
  imports: [TypeOrmExModule.forCustomRepository([ProductRepository])],
  controllers: [ProductsController],
  providers: [ProductsService, IsAdminGuard]
})
export class ProductsModule {}
