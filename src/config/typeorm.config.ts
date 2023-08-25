import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from  '@nestjs/typeorm'
import { RefreshToken } from 'src/auth/entity/refresh-token.entity';
import { Product } from 'src/products/entity/product.entity.';
import { User } from 'src/users/entity/user.entity';
import { DataSource } from 'typeorm';

//@Injectable()
 export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'petshop',
    entities: [Product, User, RefreshToken, ],
    synchronize: true,
    migrations: [''],
  } 

  /* export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'petshop',
          entities: [Product, User, RefreshToken, ],
          synchronize: true,
      });
      return dataSource.initialize();
    }
  }
] */

/* export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'postgres', */
    //entities: [ __dirname + '/../**/*.entity{.ts,.js}'],
   // entities: [Product],
   // synchronize: true,
//};