import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from  '@nestjs/typeorm'
import { Product } from 'src/products/entity/product.entity.';

//@Injectable()
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    entities: [Product],
    synchronize: true
  }

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