import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm-ex/typeorm-ex.decorator";
import { Product } from "../entity/product.entity.";
import { FilterProductDto } from "../dto/filter-product.dto";
import { CreateProductDto } from "../dto/create-product.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/users/entity/user.entity";

@CustomRepository(Product)
export class ProductRepository extends Repository<Product>{
    async getProducts(filter: FilterProductDto): Promise<Product[]> {
        const { prodName, prodDesc, min_prodPrice, max_prodPrice} = filter;

        const query = this.createQueryBuilder('product');
        //.where('product.userId = :userId', { userId: user.id});

        if (prodName) {
            query.andWhere('lower(product.prodName) LIKE :prodName', {prodName: '%${prodName.toLowerCase()}%',
            });
        }
        if (prodDesc) {
            query.andWhere('lower(product.prodDesc) LIKE :prodDesc', {prodDesc: '%${prodDesc.toLowerCase()}%',
            });
        }
        if (min_prodPrice) {
            query.andWhere('product.prodPrice >= :min_prodPrice', {min_prodPrice});
        }
        if (max_prodPrice) {
            query.andWhere('product.prodPrice <= :max_prodPrice', {max_prodPrice});
        }
        return await query.getMany();
    }

    async createProduct(user: User, createProductDto: CreateProductDto): Promise<void> {
        const { prodName, prodDesc, prodPrice } = createProductDto;

        const product = this.create();
        product.prodName = prodName;
        product.prodDesc = prodDesc;
        product.prodPrice = prodPrice;
        product.user = user;

        try{
            await product.save();
        }catch(err){
            throw new InternalServerErrorException(err);
    }
}
}