import { Count, Filter, Where } from '@loopback/repository';
import { Roles } from '../models';
import { RolesRepository } from '../repositories';
export declare class RolesController {
    rolesRepository: RolesRepository;
    constructor(rolesRepository: RolesRepository);
    create(roles: Roles): Promise<Roles>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Roles[]>;
    updateAll(roles: Roles, where?: Where): Promise<Count>;
    findById(id: number): Promise<Roles>;
    updateById(id: number, roles: Roles): Promise<void>;
    deleteById(id: number): Promise<void>;
}
