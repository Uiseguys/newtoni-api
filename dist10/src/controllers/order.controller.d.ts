import { Count, Filter, Where } from '@loopback/repository';
import { Order } from '../models';
import { OrderRepository } from '../repositories';
export declare class OrderController {
    orderRepository: OrderRepository;
    constructor(orderRepository: OrderRepository);
    create(order: Order): Promise<Order>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Order[]>;
    updateAll(order: Order, where?: Where): Promise<Count>;
    findById(id: number): Promise<Order>;
    updateById(id: number, order: Order): Promise<void>;
    deleteById(id: number): Promise<void>;
}
