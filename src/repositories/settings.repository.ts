import {DefaultCrudRepository} from '@loopback/repository';
import {Settings, SettingsRelations} from '../models';
import {AmazonPostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SettingsRepository extends DefaultCrudRepository<
  Settings,
  typeof Settings.prototype.id,
  SettingsRelations
> {
  constructor(
    @inject('datasources.AmazonPostgres') dataSource: AmazonPostgresDataSource,
  ) {
    super(Settings, dataSource);
  }
}
