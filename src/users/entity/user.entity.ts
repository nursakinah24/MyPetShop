import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm"
import * as bcrypt from 'bcryptjs';
import { RefreshToken } from "src/auth/entity/refresh-token.entity";
import { Product } from "src/products/entity/product.entity.";
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column({ default: false }) // Default to non-admin
    isAdmin: boolean;

   /*  @Column()
    role: string; */

    //@Column({default: 'user'})

    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {eager: true})
    refreshToken: RefreshToken[];

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];
    
   /*  @ManyToOne(() => Role, (role) => role.users)
    role: Role; */

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}