import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsersService {
     constructor (@InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,) {} 

    /* constructor (@Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,) {} */

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        return await this.userRepository.createUser(createUserDto);
    }

    async validateUser(email: string, password: string): Promise<User> {
        return await this.userRepository.validateUser(email, password);
    }

    async findUserById(id: string): Promise<User> {
        return await this.userRepository.findOne({where: {id}});
    }
}

