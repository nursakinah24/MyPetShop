import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmExModule } from '../typeorm-ex/typeorm-ex.module';
import { UserRepository } from "./repository/user.repository";
import { UserController } from "./users.controller";
//import { DatabaseModule } from "src/database/database.module";
//import { UserProviders } from "./user.providers";

@Module({
    imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
    controllers: [UserController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {} 