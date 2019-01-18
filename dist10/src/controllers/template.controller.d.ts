import { Count, Filter, Where } from '@loopback/repository';
import { Template } from '../models';
import { TemplateRepository } from '../repositories';
export declare class TemplateController {
    templateRepository: TemplateRepository;
    constructor(templateRepository: TemplateRepository);
    create(template: Template): Promise<Template>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Template[]>;
    updateAll(template: Template, where?: Where): Promise<Count>;
    findById(id: number): Promise<Template>;
    updateById(id: number, template: Template): Promise<void>;
    deleteById(id: number): Promise<void>;
}
