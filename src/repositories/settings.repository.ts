import {DefaultCrudRepository} from '@loopback/repository';
import {Settings, SettingsRelations} from '../models';
import {AmazonpostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SettingsRepository extends DefaultCrudRepository<
  Settings,
  typeof Settings.prototype.id,
  SettingsRelations
> {
  constructor(
    @inject('datasources.amazonpostgres') dataSource: AmazonpostgresDataSource,
  ) {
    super(Settings, dataSource);
  }
}
