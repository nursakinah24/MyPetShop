import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const {name, email, password} = createUserDto;

        const user = this.create();
        user.name = name;
        user.email = email;
        user.salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(password, user.salt);
        //user.role = role;

        try{
            await user.save();
        } catch (err) {
            console.log(err);
        }
    }

    async validateUser(email:string, password:string): Promise<User> {
        const user = await this.findOne({ where: {email} });
        if (user && (await user.validatePassword(password)) ) {
           // console.log('success')
            return user;
        }
        return null;
    }

    async seedAdminUser(): Promise<void> {
        const existingAdmin = await this.createQueryBuilder('user')
            .where('user.isAdmin = :isAdmin', { isAdmin: true })
            .getOne();

        if (!existingAdmin) {
            const adminUser = new User();
            adminUser.name = 'Admin';
            adminUser.email = 'admin@admin.com';
            adminUser.salt = await bcrypt.genSalt(saltRounds);
            adminUser.password = await bcrypt.hash('password', adminUser.salt);
            adminUser.isAdmin = true; // Set as admin

            try {
                await adminUser.save();
                console.log('Admin User seeded successfully');
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('Admin User already exists');
        }
    }
}