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
import * as crypto from 'crypto';

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
          schema: {type: 'object'},
        },
      },
    })
    newsletter: Omit<Newsletter, 'id'>,
    @inject(RestBindings.Http.RESPONSE) res: Response,
    @param.query.object('where', getWhereSchemaFor(Newsletter))
    where?: Where<Newsletter>,
  ): Promise<Newsletter | Count | object | undefined> {
    //const transporter = nodemailer.createTransport({
    //host: 'smtp.strato.de',
    //port: 465,
    //auth: {
    //user: 'newsletter@new-toni.press',
    //pass: 'Newsletter@@',
    //},
    //});

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 25,
      auth: {
        user: 'bc840133129dc4',
        pass: '8939349080a608',
      },
    });

    const findEmailKey: any = await this.newsletterRepository
      .find({
        where: {email: newsletter.email},
      })
      .then(data => {
        return data;
      });

    const emailSettings: any = await this.settingRepository
      .find({
        where: {key: 'email'},
      })
      .then(data => {
        if (data.length > 0) {
          return data[0].value;
        }
        return null;
      });

    const newsletterSettings: any = await this.settingRepository
      .find({
        where: {key: 'newsletter'},
      })
      .then(data => {
        if (data.length > 0) {
          return data[0].value;
        }
        return null;
      });

    if (!emailSettings) {
      res.statusCode = 400;
      return {
        error: {
          stausCode: 400,
          message: 'Email Settings Have Not Been Set',
        },
      };
    }

    if (!newsletterSettings) {
      res.statusCode = 400;
      return {
        error: {
          stausCode: 400,
          message: 'Newsletter Email Settings Have Not Been Set',
        },
      };
    }

    if (!(findEmailKey.length > 0)) {
      const testEmail = /^[^\/\=\#\@\|\:\;\'\"\<\,\>\\\{\[\}\]\`\~\+\*\!\s]+\@[^\/\=\#\@\|\:\;\'\"\<\,\>\\\{\[\}\]\`\~\+\*\!\s]+\.\w\w\w?(\.\w\w\w?)?$/.test(
        newsletter.email,
      );
      if (testEmail) {
        const date = new Date().getTime();
        newsletter.unsubscribe_hash = crypto
          .createHash('md5')
          .update(`${date}$alt3d${newsletter.email}`)
          .digest('hex');
        // Mail Trap Testing
        const info = await transporter.sendMail({
          from: `"New Toni Press Newsletter" <${emailSettings.from}>`,
          to: emailSettings.to,
          cc: emailSettings.cc,
          subject: '✨ New-Toni Pess: New Newsletter Subscriber',
          text: `The email ${newsletter.email} has been added to your subscription list`,
          html: `<p>The email ${newsletter.email} has been added to your subscription list</p>`,
        });

        const userInfo = await transporter.sendMail({
          from: `"New-Toni Press Newsletter" <${emailSettings.from}>`,
          to: newsletter.email,
          subject: newsletterSettings.newSubscriberSubject,
          text: `Hi, Your email ${newsletter.email} has been added to your subscription list. If received by mistake unsubscribe https://newtoni-api.herokuapp.com/newsletters/unsubscribe/${newsletter.unsubscribe_hash}`,
          html: `<p>Hi,<br/><br/>${newsletterSettings.newSubscriberMessage}<br/><br/><small style="display: block; margin-top: 30vh; text-align: center">Received this email by mistake <a href="https://newtoni-api.herokuapp.com/newsletters/unsubscribe/${newsletter.unsubscribe_hash}">unsubscribe</a></small></p>`,
        });

        console.log(
          'New Email Subscriber Message sent to admin: %s',
          info.messageId,
        );

        console.log(
          'New Email Subscriber Message sent to new subscriber: %s',
          info.messageId,
        );

        return this.newsletterRepository.create(newsletter as Newsletter);
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
    }

    const isEmailSubscribed: any = await this.newsletterRepository
      .find({
        where: {email: newsletter.email, subscribed: true},
      })
      .then(data => {
        return data;
      });

    if (!(isEmailSubscribed.length > 0)) {
      const date = new Date().getTime();
      newsletter.unsubscribe_hash = crypto
        .createHash('md5')
        .update(`${date}$alt3d${newsletter.email}`)
        .digest('hex');
      // Mail Trap Testing
      const info = await transporter.sendMail({
        from: `"New-Toni Press Newsletter" <${emailSettings.from}>`,
        to: emailSettings.to,
        cc: emailSettings.cc,
        subject: '✨ New-Toni Press: Unsubscribed Email Has Resubscribed',
        text: `The email ${newsletter.email} has been added to your subscription list`,
        html: `<p>The email ${newsletter.email} has been added to your subscription list</p>`,
      });

      const userInfo = await transporter.sendMail({
        from: `"New-Toni Press Newsletter" <${emailSettings.from}>`,
        to: newsletter.email,
        subject: newsletterSettings.newSubscriberSubject,
        text: `The email ${newsletter.email} has been added to your subscription list. If received by mistake unsubscribe https://newtoni-api.herokuapp.com/newsletters/unsubscribe/${newsletter.unsubscribe_hash}`,
        html: `<p>Hi,<br/><br/>${newsletterSettings.newSubscriberMessage}<br/><br/><small style="display: block; margin-top: 30vh; text-align: center">Received this email by mistake <a href="https://newtoni-api.herokuapp.com/newsletters/unsubscribe/${newsletter.unsubscribe_hash}">unsubscribe</a></small></p>`,
      });

      console.log(
        'Old Email has been resubscribed Message sent to admin: %s',
        info.messageId,
      );

      console.log(
        'Old Email has been resubscribed Message sent to subscriber: %s',
        userInfo.messageId,
      );

      return this.newsletterRepository.updateAll(
        {...newsletter, subscribed: true} as Newsletter,
        {
          email: newsletter.email,
        },
      );
    }

    res.statusCode = 400;
    return {
      error: {
        stausCode: 400,
        message: 'Email is already subscribed',
      },
    };
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

  @get('/newsletters/unsubscribe/{hash}', {
    responses: {
      '200': {
        description: 'Newsletter PATCH success count',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async unsubscribe(
    @inject(RestBindings.Http.RESPONSE) res: Response,
    @param.path.string('hash')
    hash: string,
  ): Promise<Count | void | object> {
    const isHashAvailable: any = await this.newsletterRepository
      .find({
        where: {unsubscribe_hash: hash},
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        res.statusCode = 400;
        res.send({
          error: {
            statusCode: 400,
            message: 'Error Fetching Key',
          },
        });
      });

    if (!(isHashAvailable.length > 0)) {
      res.statusCode = 400;
      return {
        error: {
          statusCode: 400,
          message: 'No Email is associated with provided key',
        },
      };
    }
    //const transporter = nodemailer.createTransport({
    //host: 'smtp.strato.de',
    //port: 465,
    //auth: {
    //user: 'newsletter@new-toni.press',
    //pass: 'Newsletter@@',
    //},
    //});

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 25,
      auth: {
        user: 'bc840133129dc4',
        pass: '8939349080a608',
      },
    });

    const emailSettings: any = await this.settingRepository
      .find({
        where: {key: 'email'},
      })
      .then(data => {
        if (data.length > 0) {
          return data[0].value;
        }
        return null;
      });

    if (!emailSettings) {
      res.statusCode = 400;
      return {
        error: {
          stausCode: 400,
          message: 'Email Settings Have Not Been Set',
        },
      };
    }

    const info = await transporter.sendMail({
      from: `"New-Toni Press Newsletter" <${emailSettings.from}>`,
      to: emailSettings.to,
      cc: emailSettings.cc,
      subject: '✨ New-Toni Press: Email Unsubscription',
      text: `The email ${isHashAvailable[0].email} has unsubscribed`,
      html: `<p>The email ${isHashAvailable[0].email} has unsubscribed</p>`,
    });

    const userInfo = await transporter.sendMail({
      from: `"New-Toni Press Newsletter" <${emailSettings.from}>`,
      to: isHashAvailable[0].email,
      subject: '✨ New-Toni Press: You Have Successfully Been Unsubscribed',
      text:
        'You are now successfully unsubscribed from Newtoni Press, if you change your mind head over to our website and resubmit your email address',
      html: `<p>You are now successfully unsubscribed from Newtoni Press, if you change your mind head over to our website and resubmit your email address</p>`,
    });

    console.log(
      'Email Unsubscription Message sent to admin: %s',
      info.messageId,
    );

    console.log(
      'Email Unsubscription Message sent to unsubscriber: %s',
      info.messageId,
    );

    return this.newsletterRepository.updateAll(
      {subscribed: false, unsubscribe_hash: ''} as Newsletter,
      {where: {unsubscribe_hash: hash}},
    );
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
