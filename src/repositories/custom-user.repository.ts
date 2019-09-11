import {DefaultCrudRepository} from '@loopback/repository';
import {CustomUser, CustomUserRelations} from '../models';
import {AmazonpostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CustomUserRepository extends DefaultCrudRepository<
  CustomUser,
  typeof CustomUser.prototype.id,
  CustomUserRelations
> {
  constructor(
    @inject('datasources.amazonpostgres')
    dataSource: AmazonpostgresDataSource,
  ) {
    super(CustomUser, dataSource);
  }
}
