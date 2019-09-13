import {DefaultCrudRepository} from '@loopback/repository';
import {CustomUser, CustomUserRelations} from '../models';
import {AmazonPostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CustomUserRepository extends DefaultCrudRepository<
  CustomUser,
  typeof CustomUser.prototype.id,
  CustomUserRelations
> {
  constructor(
    @inject('datasources.AmazonPostgres')
    dataSource: AmazonPostgresDataSource,
  ) {
    super(CustomUser, dataSource);
  }
}
