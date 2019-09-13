import {DefaultCrudRepository} from '@loopback/repository';
import {Resources, ResourcesRelations} from '../models';
import {AmazonPostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ResourcesRepository extends DefaultCrudRepository<
  Resources,
  typeof Resources.prototype.id,
  ResourcesRelations
> {
  constructor(
    @inject('datasources.AmazonPostgres')
    dataSource: AmazonPostgresDataSource,
  ) {
    super(Resources, dataSource);
  }
}
