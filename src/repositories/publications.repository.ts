import {DefaultCrudRepository} from '@loopback/repository';
import {Publications, PublicationsRelations} from '../models';
import {LocaldbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PublicationsRepository extends DefaultCrudRepository<
  Publications,
  typeof Publications.prototype.id,
  PublicationsRelations
> {
  constructor(@inject('datasources.localdb') dataSource: LocaldbDataSource) {
    super(Publications, dataSource);
  }
}
