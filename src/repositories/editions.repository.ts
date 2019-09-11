import {DefaultCrudRepository} from '@loopback/repository';
import {Editions, EditionsRelations} from '../models';
import {AmazonpostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EditionsRepository extends DefaultCrudRepository<
  Editions,
  typeof Editions.prototype.id,
  EditionsRelations
> {
  constructor(
    @inject('datasources.amazonpostgres')
    dataSource: AmazonpostgresDataSource,
  ) {
    super(Editions, dataSource);
  }
}
