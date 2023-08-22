import { Type } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    prodName: string;

    @IsNotEmpty()
    @IsString()
    prodDesc: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    prodPrice: number;
}