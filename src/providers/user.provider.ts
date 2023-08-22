import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "src/entity/user.entity";

/* export const userProvider: Provider[] = [
    {
        provide: 'USERS_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: ['DATABASE_CONNECTION']
    }] */

    export const userProvider = [
        {
            provide: 'USERS_REPOSITORY',
            useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
            inject: ['DATA_SOURCE'],
        }
    ];