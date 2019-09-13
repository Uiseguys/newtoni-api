import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './amazon-postgres.datasource.json';

export class AmazonPostgresDataSource extends juggler.DataSource {
  static dataSourceName = 'AmazonPostgres';

  constructor(
    @inject('datasources.config.AmazonPostgres', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
