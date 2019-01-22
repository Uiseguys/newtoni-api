import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import { Newsletter } from '../models';
import { NewsletterRepository } from '../repositories';
var request = require('request');
const config = require("../datasources/db.datasource.json");


export class NewsletterController {
  constructor(
    @repository(NewsletterRepository)
    public newsletterRepository: NewsletterRepository,
  ) { }

  @post('/newsletters', {
    responses: {
      '200': {
        description: 'Newsletter model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Newsletter } } },
      },
    },
  })
  async create(@requestBody() newsletter: Newsletter): Promise<Newsletter> {

    var subscriber = JSON.stringify({
      "email_address": newsletter.email,
      "status": "subscribed"
    });
    request({
      method: 'POST',
      url: 'https://us20.api.mailchimp.com/3.0/lists/' + process.env.mailchimp_listId + '/members',
      body: subscriber,
      headers:
      {
        Authorization: 'apikey ' + process.env.mailchimp_api,
        'Content-Type': 'application/json'
      }
    },
      function (error: any, response: Response, body: any) {
        if (error) {
          return error;
        } else {
          var bodyObj = JSON.parse(body);
          if (bodyObj.status === 400) {
            return bodyObj.detail
          }
          var bodyObj = JSON.parse(body);
          return bodyObj
        }
      });
    return await this.newsletterRepository.create(newsletter);
  }

}
