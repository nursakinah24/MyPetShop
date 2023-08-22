import { Type } from 'class-transformer';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class FilterProductDto{
    @IsOptional()
    @IsString()
    prodName: string;

    @IsOptional()
    @IsString()
    prodDesc: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    min_prodPrice: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    max_prodPrice: number;
}