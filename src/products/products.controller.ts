import { Controller, Get, Body, Delete, Post, Put, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { Product } from './entity/product.entity.';
import { UUIDValidationPipe } from 'src/pipes/uuid-validatonpipes';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/users/entity/user.entity';
import { JwtGuard } from 'src/guard/jwt.guard';
import { IsAdminGuard } from 'src/guard/role.guard';
//import { RoleGuard } from 'src/guard/role.guard';
//import { Roles } from 'src/decorator/role.decorator';

@Controller('products')
@UseGuards(JwtGuard)
export class ProductsController {
    constructor(private productsService: ProductsService) {}

   // @UseGuards(IsAdminGuard)
 /*    @Get()
    async getProducts(@Query() filter: FilterProductDto, @GetUser() user: User): Promise<Product[]>{
       // console.log(user);
        return this.productsService.getProducts(user, filter);
    } */

    @Get()
    async getProducts(@Query() filter: FilterProductDto,): Promise<Product[]>{
       // console.log(user);
        return this.productsService.getProducts(filter);
    }

    @Post()
    async createProduct(@GetUser() user: User, @Body() payload: CreateProductDto): Promise<void>{
        return this.productsService.createProduct(user, payload);
    }

    @Get('/:id')
    async getProductById(@GetUser() user: User, @Param('id', UUIDValidationPipe) id: string): Promise<Product>{
        return this.productsService.getProductById(user, id);
    } 
    
    @UseGuards(IsAdminGuard)
    @Put('/:id')
    async updateProduct(
        @GetUser() user: User,
        @Param('id', UUIDValidationPipe) id: string, 
        @Body() payLoad: UpdateProductDto,): Promise<void>{
        return this.productsService.updateProduct(user, id, payLoad);
    }

    @UseGuards(IsAdminGuard) 
    @Delete('/:id')
    async deleteProduct(@GetUser() user: User,
    @Param('id', UUIDValidationPipe) id: string): Promise<void> {
        return this.productsService.deleteProduct(user, id);
    }
}

