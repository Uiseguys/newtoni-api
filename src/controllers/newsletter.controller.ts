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
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import {Newsletter} from '../models';
import {NewsletterRepository, SettingRepository} from '../repositories';
import * as nodemailer from 'nodemailer';

export class NewsletterController {
  constructor(
    @repository(NewsletterRepository)
    public newsletterRepository: NewsletterRepository,
    @repository(SettingRepository)
    public settingRepository: SettingRepository,
  ) {}

  @post('/newsletters', {
    responses: {
      '200': {
        description: 'Newsletter model instance',
        content: {'application/json': {schema: getModelSchemaRef(Newsletter)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Newsletter, {
            title: 'NewNewsletter',
            exclude: ['id'],
          }),
        },
      },
    })
    newsletter: Omit<Newsletter, 'id'>,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ): Promise<Newsletter | void> {
    try {
      const testEmail = /^[^\/\=\#\@\|\:\;\'\"\<\,\>\\\{\[\}\]\`\~\+\*\!\s]+\@\w+\.\w\w\w?(\.\w\w\w?)?$/.test(
        newsletter.email,
      );
      if (testEmail) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.strato.de',
          port: 465,
          auth: {
            user: 'newsletter@new-toni.press',
            pass: 'Newsletter@@',
          },
        });

        // const transporter = nodemailer.createTransport({
        //   host: 'smtp.mailtrap.io',
        //   port: 2525,
        //   auth: {
        //     user: 'bc840133129dc4',
        //     pass: '8939349080a608',
        //   },
        // });

        const emailSettings: any = await this.settingRepository
          .find({
            where: {key: 'email'},
          })
          .then(data => {
            return data[0].value;
          })
          .catch(err => {
            res.contentType('application/json');
            res.statusCode = 500;
            res.send({
              error: {
                statusCode: 500,
                message: 'Error Fetching Email Settings',
              },
            });
          });

        // Mail Trap Testing
        let info = await transporter.sendMail({
          from: `"Newtoni Newsletter" <${emailSettings.from}>`,
          to: emailSettings.to,
          cc: emailSettings.cc,
          subject: '✨ New Newsletter Subscriber',
          text: `The email ${newsletter.email} has been added to your subscription list`,
          html: `<b>The email ${newsletter.email} has been added to your subscription list</b>`,
        });
        console.log('New Email Subscriber Message sent: %s', info.messageId);
        return this.newsletterRepository.create(newsletter);
      } else {
        res.contentType('application/json');
        res.statusCode = 500;
        res.send({
          error: {
            statusCode: 500,
            message: 'Provided Email is not Valid',
          },
        });
      }
    } catch (err) {
      console.log(err);
      res.contentType('application/json');
      res.statusCode = 500;
      res.send({
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
        },
      });
    }
  }

  @get('/newsletters/count', {
    responses: {
      '200': {
        description: 'Newsletter model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Newsletter))
    where?: Where<Newsletter>,
  ): Promise<Count> {
    return this.newsletterRepository.count(where);
  }

  @get('/newsletters', {
    responses: {
      '200': {
        description: 'Array of Newsletter model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Newsletter)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Newsletter))
    filter?: Filter<Newsletter>,
  ): Promise<Newsletter[]> {
    return this.newsletterRepository.find(filter);
  }

  @patch('/newsletters', {
    responses: {
      '200': {
        description: 'Newsletter PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Newsletter, {partial: true}),
        },
      },
    })
    newsletter: Newsletter,
    @param.query.object('where', getWhereSchemaFor(Newsletter))
    where?: Where<Newsletter>,
  ): Promise<Count> {
    return this.newsletterRepository.updateAll(newsletter, where);
  }

  @get('/newsletters/{id}', {
    responses: {
      '200': {
        description: 'Newsletter model instance',
        content: {'application/json': {schema: getModelSchemaRef(Newsletter)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Newsletter> {
    return this.newsletterRepository.findById(id);
  }

  @patch('/newsletters/{id}', {
    responses: {
      '204': {
        description: 'Newsletter PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Newsletter, {partial: true}),
        },
      },
    })
    newsletter: Newsletter,
  ): Promise<void> {
    await this.newsletterRepository.updateById(id, newsletter);
  }

  @put('/newsletters/{id}', {
    responses: {
      '204': {
        description: 'Newsletter PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() newsletter: Newsletter,
  ): Promise<void> {
    await this.newsletterRepository.replaceById(id, newsletter);
  }

  @del('/newsletters/{id}', {
    responses: {
      '204': {
        description: 'Newsletter DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.newsletterRepository.deleteById(id);
  }
}
