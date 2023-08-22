import { Body, Controller, Get, Post, Param,} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "src/users/entity/user.entity";

@Controller()
export class UserController{
    constructor(private usersService: UsersService) {}

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post()
    create(@Body() user: User){
        return this.usersService.createUsers(user);
    }

  /*   @Get(':id')
    getOneUsers(@Param('id') id: string): Promise<User[]> {
        return this.usersService.findOne(Number(id));
    } */
}