import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './google-cloud-storage.datasource.json';

export class GoogleCloudStorageDataSource extends juggler.DataSource {
  static dataSourceName = 'GoogleCloudStorage';

  constructor(
    @inject('datasources.config.GoogleCloudStorage', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
