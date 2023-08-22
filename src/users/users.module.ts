import { Module } from "@nestjs/common";
import { DatabasesModule } from "src/database/database.module";
import { userProvider } from "src/providers/user.provider";
import { UsersService } from "./users.service";
import { UserController } from "./users.controller";

@Module({
    imports: [DatabasesModule],
    controllers: [UserController],
    providers: [...userProvider, UsersService],
})
export class UserModule {}