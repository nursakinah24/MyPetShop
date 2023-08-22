import { User } from "src/entity/user.entity";
import { DataSource, createConnection } from "typeorm";

export const databaseProvider = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () =>  {const dataSource = new DataSource ({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'postgres',
           // entities: [User],
           entities: [ __dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
            //ssl: true
        });
        return dataSource.initialize();
        }
    }
] 
    