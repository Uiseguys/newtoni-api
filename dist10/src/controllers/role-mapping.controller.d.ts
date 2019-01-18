import { Count, Filter, Where } from '@loopback/repository';
import { RoleMapping } from '../models';
import { RoleMappingRepository } from '../repositories';
export declare class RoleMappingController {
    roleMappingRepository: RoleMappingRepository;
    constructor(roleMappingRepository: RoleMappingRepository);
    create(roleMapping: RoleMapping): Promise<RoleMapping>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<RoleMapping[]>;
    updateAll(roleMapping: RoleMapping, where?: Where): Promise<Count>;
    findById(id: number): Promise<RoleMapping>;
    updateById(id: number, roleMapping: RoleMapping): Promise<void>;
    deleteById(id: number): Promise<void>;
}
