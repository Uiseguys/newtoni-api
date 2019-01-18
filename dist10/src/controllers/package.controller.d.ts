import { Count, Filter, Where } from '@loopback/repository';
import { Package } from '../models';
import { PackageRepository } from '../repositories';
export declare class PackageController {
    packageRepository: PackageRepository;
    constructor(packageRepository: PackageRepository);
    create(packages: Package): Promise<Package>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Package[]>;
    updateAll(packages: Package, where?: Where): Promise<Count>;
    findById(id: number): Promise<Package>;
    updateById(id: number, packages: Package): Promise<void>;
    deleteById(id: number): Promise<void>;
}
