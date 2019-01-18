import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Newsletter } from '../models';
export declare class NewsletterRepository extends DefaultCrudRepository<Newsletter, typeof Newsletter.prototype.email> {
    constructor(dataSource: juggler.DataSource);
}
