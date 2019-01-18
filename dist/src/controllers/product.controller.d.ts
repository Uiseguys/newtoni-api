/// <reference types="express" />
import { Count, Filter, Where } from '@loopback/repository';
import { Response, Request } from '@loopback/rest';
import { Product } from '../models';
import { ProductRepository } from '../repositories';
import { UserProfile } from '@loopback/authentication';
export declare class ProductController {
    productRepository: ProductRepository;
    private user;
    constructor(productRepository: ProductRepository, user: UserProfile);
    create(product: Product, request: Request, response: Response): Promise<Product>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<object>;
    updateAll(product: Product, where?: Where): Promise<Count>;
    findById(id: number): Promise<Product>;
    updateById(id: number, product: Product): Promise<void>;
    deleteById(id: number): Promise<void>;
}
