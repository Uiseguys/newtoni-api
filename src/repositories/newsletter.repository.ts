import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Newsletter } from '../models';

import { inject } from '@loopback/core';

export class NewsletterRepository extends DefaultCrudRepository<
  Newsletter,
  typeof Newsletter.prototype.email
  > {
  constructor(@inject('datasources.db') dataSource: juggler.DataSource) {
    super(Newsletter, dataSource);
  }
}
