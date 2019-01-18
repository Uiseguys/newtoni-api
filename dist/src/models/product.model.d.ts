import { Entity } from '@loopback/repository';
export declare class Product extends Entity {
    type: string;
    name?: string;
    id?: number;
    price: number;
    image: string;
    availability: boolean;
    content: number;
    priority: number;
    no: number;
    description: string;
    constructor(data?: Partial<Product>);
}
