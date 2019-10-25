import {DefaultCrudRepository} from '@loopback/repository';
import {Newsletter, NewsletterRelations} from '../models';
import {AmazonPostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NewsletterRepository extends DefaultCrudRepository<
	Newsletter,
	typeof Newsletter.prototype.id,
	NewsletterRelations
> {
	constructor(
		@inject('datasources.AmazonPostgres')
		dataSource: AmazonPostgresDataSource,
	) {
		super(Newsletter, dataSource);
	}
}
