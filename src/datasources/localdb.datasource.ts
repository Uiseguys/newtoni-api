import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './localdb.datasource.json';

export class LocaldbDataSource extends juggler.DataSource {
  static dataSourceName = 'localdb';

  constructor(
    @inject('datasources.config.localdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
