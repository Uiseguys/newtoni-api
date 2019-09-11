import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './amazonpostgres.datasource.json';

export class AmazonpostgresDataSource extends juggler.DataSource {
  static dataSourceName = 'amazonpostgres';

  constructor(
    @inject('datasources.config.amazonpostgres', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
