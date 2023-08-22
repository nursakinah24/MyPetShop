import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { userProvider } from './providers/user.provider';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UserModule, RouterModule.register([{
    path: 'api/users',
    module: UserModule,
  }]), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
