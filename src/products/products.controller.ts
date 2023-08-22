import { Controller, Get, Body, Delete, Post, Put, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts();
    }

    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts();
    }

    @Get('/:id')
    getProduct(@Param('id') id: string){
        return this.productsService.getProduct(id);
    }

    @Post()
    createProduct(@Body('prodName') prodName: string, 
    @Body('prodDesc') prodDesc: string,
    @Body('prodPrice') prodPrice: string,)
    {
        return this.productsService.createProduct(prodName, prodDesc, prodPrice);
    }

    @Put('/:id')
    updateProduct(@Param('id') id: string, 
    @Body('prodName') prodName: string, 
    @Body('prodDesc') prodDesc: string, 
    @Body('prodPrice') prodPrice: string)
    {
        return this.productsService.updateProduct(id, prodName, prodDesc, prodPrice);
    }

    @Delete('/:id')
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id);
    }
}

