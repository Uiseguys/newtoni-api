/// <reference types="express" />
import { Count, Filter, Where } from '@loopback/repository';
import { Response, Request } from '@loopback/rest';
import { Setting } from '../models';
import { SettingRepository } from '../repositories';
export declare class SettingController {
    settingRepository: SettingRepository;
    constructor(settingRepository: SettingRepository);
    upsertWithWhere(request: Request, response: Response, where?: Where): Promise<void>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Setting[]>;
    updateById(id: number, setting: Setting): Promise<void>;
    deleteById(id: number): Promise<void>;
}
