import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../entity/dto/create-user.dto";
//import * as bcrypt from 'bcrypt';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const {name, email, password} = createUserDto;

        const user = this.create();
        user.name = name;
        user.email = email;
       // user.salt = await bcrypt.genSa

    }
}