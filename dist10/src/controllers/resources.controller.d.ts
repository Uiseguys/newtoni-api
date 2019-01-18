/// <reference types="express" />
import { Count, Filter, Where } from '@loopback/repository';
import { Response, Request } from '@loopback/rest';
import { Resource } from '../models';
import { ResourceRepository } from '../repositories';
export declare class ResourcesController {
    resourceRepository: ResourceRepository;
    constructor(resourceRepository: ResourceRepository);
    create(resource: Resource, response: Response): Promise<Resource>;
    upload(request: Request, response: Response): Promise<object>;
    download(resource: Resource): Promise<Resource>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Resource[]>;
    findById(id: number): Promise<Resource>;
    deleteById(id: number): Promise<void>;
}
