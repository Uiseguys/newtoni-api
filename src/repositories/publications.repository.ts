import {DefaultCrudRepository} from '@loopback/repository';
import {Publications, PublicationsRelations} from '../models';
import {AmazonpostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PublicationsRepository extends DefaultCrudRepository<
  Publications,
  typeof Publications.prototype.id,
  PublicationsRelations
> {
  constructor(
    @inject('datasources.amazonpostgres')
    dataSource: AmazonpostgresDataSource,
  ) {
    super(Publications, dataSource);
  }
}
