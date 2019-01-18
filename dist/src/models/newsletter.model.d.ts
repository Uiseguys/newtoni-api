import { Entity } from '@loopback/repository';
export declare class Newsletter extends Entity {
    email: string;
    isSubscribed?: boolean;
    constructor(data?: Partial<Newsletter>);
}
