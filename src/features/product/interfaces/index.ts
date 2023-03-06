import { CategoryApi } from '../../category/interfaces';
import Base from '../../shared/interfaces/Base';
import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { IPaginatedBodyApi } from '../../shared/interfaces/response/IPaginatedBodyApi';

export interface Product
{
    price: number;
    title: string;
    enable: boolean;
    category: CategoryApi;
}

export interface ProductPayload
{
    price: number;
    title: string;
    enable: boolean;
    category: string;
}

export interface ProductApi extends Product, Base {}

export type ProductResponse = IBodyApi & {
    data: ProductApi;
};

export type ProductListResponse = IPaginatedBodyApi & {
    data: ProductApi[];
};
