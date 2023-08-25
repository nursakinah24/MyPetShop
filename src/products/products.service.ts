import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterProductDto } from './dto/filter-product.dto';
import { Product } from './entity/product.entity.';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class ProductsService {
    constructor (@InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository){}

 /*    async getProducts(user: User, filter: FilterProductDto): Promise<Product[]>{
        return await this.productRepository.getProducts(user, filter);
    } */
    async getProducts(filter: FilterProductDto): Promise<Product[]>{
        return await this.productRepository.getProducts(filter);
    }

    async createProduct(user: User, createProductDto: CreateProductDto): Promise<void>{
        return await this.productRepository.createProduct(user, createProductDto);
    }
    
    async getProductById(user: User, id: string): Promise<Product>{
        const product =  await this.productRepository.findOne({ where: { id, user: {id : user.id}}},);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    } 
    
    async updateProduct(user: User, id: string, updateProductDto: UpdateProductDto): Promise<void>{ {
        const {prodName, prodDesc, prodPrice} = updateProductDto;
        const product = await this.getProductById(user, id);
        product.prodName = prodName;
        product.prodDesc = prodDesc;
        product.prodPrice = prodPrice;

        await product.save();
        }
    }

    async deleteProduct(user: User, id: string): Promise<void>{
        const result = await this.productRepository.delete({id, user: {id : user.id}});
        if (result.affected == 0) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
    }
}
