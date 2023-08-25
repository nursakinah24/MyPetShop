import { Body, Controller, Get, Post, Param,} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/users/entity/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UserController{
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() payload: CreateUserDto): Promise<void> {
        return this.usersService.createUser(payload);
    }
}