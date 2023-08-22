import { Controller, Get, Body, Delete, Post, Put, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Product } from './entity/product.entity.';
import { UUIDValidationPipe } from 'src/pipes/uuid-validatonpipes';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async getProducts(@Query() filter: FilterProductDto): Promise<Product[]>{
        return this.productsService.getProducts(filter);
    }

    @Post()
    async createProduct(@Body() payload: CreateProductDto): Promise<void>{
        return this.productsService.createProduct(payload);
    }

    @Get('/:id')
    async getProductById(@Param('id', UUIDValidationPipe) id: string): Promise<Product>{
        return this.productsService.getProductById(id);
    }

    @Put('/:id')
    async updateProduct(
        @Param('id', UUIDValidationPipe) id: string, 
        @Body() payLoad: UpdateProductDto,): Promise<void>{
        return this.productsService.updateProduct(id, payLoad);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
        return this.productsService.deleteProduct(id);
    }
}

