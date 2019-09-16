import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './google-storage.datasource.json';

export class GoogleStorageDataSource extends juggler.DataSource {
  static dataSourceName = 'GoogleStorage';

  constructor(
    @inject('datasources.config.GoogleStorage', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
