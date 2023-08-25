/* // src/seeder/admin-seeder.ts
import { createConnection } from 'typeorm';
import { User } from '../users/entity/user.entity';

async function seedAdminUser() {
    const connection = await createConnection();

    const userRepository = connection.getRepository(User);

    // Check if admin user already exists
   

    await connection.close();
}

seedAdminUser();
 */