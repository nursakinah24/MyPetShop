import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { Repository, InsertResult } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_REPOSITORY') private usersRepository: Repository<User>){}
    
    async getUsers(): Promise<User[]>{
        return this.usersRepository.find();
    }

    async createUsers(user: User): Promise<InsertResult>{
        return this.usersRepository.insert(user);
    }

   /*  async findOne(id: number): Promise<User>{
    return this.usersRepository.findOne(id);
    }

    async update(id: number, user: User): Promise<User>{
        const userToUpdate = await this.usersRepository.findOne(id);
        if (userToUpdate === undefined){
            throw new NotFoundException();
        }
        await this.usersRepository.update(id, user);
        return this.findOne(id);
    } */
}

