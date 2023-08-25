import { User } from "src/users/entity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    prodName: string;

    @Column()
    prodDesc: string;

    @Column()
    prodPrice: number;
  
    @ManyToOne(() => User, (user) => user.products)
    user: User;
}