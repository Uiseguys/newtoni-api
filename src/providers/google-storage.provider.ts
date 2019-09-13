import {getService, juggler} from '@loopback/service-proxy';
import {Provider} from '@loopback/core';
import {GoogleStorageDataSource} from '../datasources/google-storage.datasource';
import {IGooogleStorageService} from '../interfaces';

export class GoogleStorageServiceProvider
  implements Provider<IGooogleStorageService> {
  constructor(
    protected dataSource: juggler.DataSource = new GoogleStorageDataSource() /* I try to change the line above in the same way that documentation show,
    as follows:

    @inject('datasources.StorageGC')
    protected dataSource: juggler.DataSource = new StorageGCDataSource()

    and also, in the same way that repositories

    @inject('datasources.StorageGC')
    protected dataSource: StorageGCDataSource

    but always return:

    `Error: Cannot resolve injected arguments for StorageGCServiceProvider.[0]:
    The arguments[0] is not decorated for dependency injection, but a value is
    not supplied`
     */,
  ) {}

  value(): Promise<IGooogleStorageService> {
    return getService(this.dataSource);
  }
}
