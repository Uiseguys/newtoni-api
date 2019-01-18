/// <reference types="express" />
import { Response, Request } from '@loopback/rest';
import { Payment } from '../models';
import { OrderRepository } from '../repositories';
import { SettingRepository } from '../repositories';
export declare class PaymentController {
    orderRepository: OrderRepository;
    settingRepository: SettingRepository;
    constructor(orderRepository: OrderRepository, settingRepository: SettingRepository);
    checkout(payment: Payment, request: Request, response: Response): Promise<object>;
    execute(request: Request, response: Response): Promise<object>;
}
