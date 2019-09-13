import {DefaultCrudRepository} from '@loopback/repository';
import {Publications, PublicationsRelations} from '../models';
import {AmazonPostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PublicationsRepository extends DefaultCrudRepository<
  Publications,
  typeof Publications.prototype.id,
  PublicationsRelations
> {
  constructor(
    @inject('datasources.AmazonPostgres')
    dataSource: AmazonPostgresDataSource,
  ) {
    super(Publications, dataSource);
  }
}
