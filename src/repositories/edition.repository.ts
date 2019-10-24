import {DefaultCrudRepository} from '@loopback/repository';
import {Edition, EditionRelations} from '../models';
import {AmazonPostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EditionRepository extends DefaultCrudRepository<
  Edition,
  typeof Edition.prototype.id,
  EditionRelations
> {
  constructor(
    @inject('datasources.AmazonPostgres')
    dataSource: AmazonPostgresDataSource,
  ) {
    super(Edition, dataSource);
  }
}
