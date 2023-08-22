import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './repository/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterProductDto } from './dto/filter-product.dto';
import { Product } from './entity/product.entity.';

@Injectable()
export class ProductsService {
    constructor (@InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository){}

    async getProducts(filter: FilterProductDto): Promise<Product[]>{
        return await this.productRepository.getProducts(filter);
    }

    async createProduct(createProductDto: CreateProductDto): Promise<void>{
        return await this.productRepository.createProduct(createProductDto);
    }
    
    async getProductById(id: string): Promise<Product>{
        const product =  await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    } 
    
    async updateProduct(id: string, updateProductDto): Promise<void>{ {
        const {prodName, prodDesc, prodPrice} = updateProductDto;
        const product = await this.getProductById(id);
        product.prodName = prodName;
        product.prodDesc = prodDesc;
        product.prodPrice = prodPrice;

        await product.save();
        }
    }

    async deleteProduct(id: string): Promise<void>{
        const result = await this.productRepository.delete(id)
        if (result.affected == 0) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
    }
}
