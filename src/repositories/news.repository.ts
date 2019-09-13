import {DefaultCrudRepository} from '@loopback/repository';
import {News, NewsRelations} from '../models';
import {AmazonPostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NewsRepository extends DefaultCrudRepository<
  News,
  typeof News.prototype.id,
  NewsRelations
> {
  constructor(
    @inject('datasources.AmazonPostgres') dataSource: AmazonPostgresDataSource,
  ) {
    super(News, dataSource);
  }
}
