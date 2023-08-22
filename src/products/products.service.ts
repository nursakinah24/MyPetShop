import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
    private products: any[] = [];

    getAllProducts(): any[] {
        return this.products;
    }

    getProducts(prodName: string, prodDesc: string, prodPrice: string): any[] {
        const products = this.products.filter((product) => {
            let isMatch = true;
            if (prodName )
        });
        return this.products;
    }

    getProduct(id: string) {
        const productIdx = this.findProductById(id);
        return this.products[productIdx]
    }

    createProduct(prodName: string, prodDesc: string, prodPrice: string) {
        this.products.push({ id: uuidv4(), prodName, prodDesc, prodPrice});
    }

    updateProduct(id: string, prodName: string, prodDesc: string, prodPrice: string){
        const prodIdx = this.findProductById(id);
        this.products[prodIdx].prodName = prodName;
        this.products[prodIdx].prodDesc = prodDesc;
        this.products[prodIdx].prodPrice = prodPrice;
    }

    findProductById(id: string) {
        const productIdx = this.products.findIndex((product) => product.id === id);
        if (productIdx === -1) {
            throw new NotFoundException('Product with id ${id} is not found');
        }
        return productIdx;
    }

    deleteProduct(id: string) {
        const productIdx = this.findProductById(id);
        this.products.splice(productIdx, 1);
    }
}
