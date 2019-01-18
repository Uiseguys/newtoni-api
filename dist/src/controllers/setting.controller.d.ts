/// <reference types="express" />
import { Count, Filter, Where } from '@loopback/repository';
import { Response, Request } from '@loopback/rest';
import { Setting } from '../models';
import { SettingRepository } from '../repositories';
import { UserProfile } from '@loopback/authentication';
export declare class SettingController {
    settingRepository: SettingRepository;
    private user;
    constructor(settingRepository: SettingRepository, user: UserProfile);
    upsertWithWhere(request: Request, response: Response, where?: Where): Promise<void>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Setting[]>;
    updateById(id: number, setting: Setting): Promise<void>;
    deleteById(id: number): Promise<void>;
}
