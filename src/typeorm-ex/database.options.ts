/* import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class DatabaseOptions implements TypeOrmOptionsFactory {

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...
      entities: [UserEntity],
    };
  }
} */