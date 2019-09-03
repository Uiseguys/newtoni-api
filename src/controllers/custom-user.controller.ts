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
  RestBindings,
  Response,
  Request,
} from '@loopback/rest';
import {inject} from '@loopback/context';
import {CustomUser} from '../models';
import {CustomUserRepository} from '../repositories';
import * as bcrypt from 'bcrypt';

export class CustomUserController {
  constructor(
    @repository(CustomUserRepository)
    public customUserRepository: CustomUserRepository,
  ) {}

  @post('/custom-users', {
    responses: {
      '200': {
        description: 'CustomUser model instance',
        content: {'application/json': {schema: getModelSchemaRef(CustomUser)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomUser, {exclude: ['id']}),
        },
      },
    })
    customUser: Omit<CustomUser, 'id'>,
  ): Promise<CustomUser> {
    customUser.password = bcrypt.hashSync(customUser.password, 10);
    return this.customUserRepository.create(customUser);
  }

  @get('/custom-users/count', {
    responses: {
      '200': {
        description: 'CustomUser model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(CustomUser))
    where?: Where<CustomUser>,
  ): Promise<Count> {
    return this.customUserRepository.count(where);
  }

  @get('/custom-users', {
    responses: {
      '200': {
        description: 'Array of CustomUser model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CustomUser)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CustomUser))
    filter?: Filter<CustomUser>,
  ): Promise<CustomUser[]> {
    return this.customUserRepository.find(filter);
  }

  @patch('/custom-users', {
    responses: {
      '200': {
        description: 'CustomUser PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomUser, {partial: true}),
        },
      },
    })
    customUser: CustomUser,
    @param.query.object('where', getWhereSchemaFor(CustomUser))
    where?: Where<CustomUser>,
  ): Promise<Count> {
    return this.customUserRepository.updateAll(customUser, where);
  }

  @get('/custom-users/{id}', {
    responses: {
      '200': {
        description: 'CustomUser model instance',
        content: {'application/json': {schema: getModelSchemaRef(CustomUser)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<CustomUser> {
    return this.customUserRepository.findById(id);
  }

  @patch('/custom-users/{id}', {
    responses: {
      '204': {
        description: 'CustomUser PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomUser, {partial: true}),
        },
      },
    })
    customUser: CustomUser,
  ): Promise<void> {
    await this.customUserRepository.updateById(id, customUser);
  }

  @put('/custom-users/{id}', {
    responses: {
      '204': {
        description: 'CustomUser PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() customUser: CustomUser,
  ): Promise<void> {
    await this.customUserRepository.replaceById(id, customUser);
  }

  @del('/custom-users/{id}', {
    responses: {
      '204': {
        description: 'CustomUser DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.customUserRepository.deleteById(id);
  }

  @post('custom-users/login', {
    responses: {
      '200': {
        description: 'User login success',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CustomUser, {partial: true}),
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CustomUser, {
            exclude: [
              'settings',
              'id',
              'realm',
              'username',
              'emailVerified',
              'verificationToken',
            ],
          }),
        },
      },
    })
    @inject(RestBindings.Http.REQUEST)
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<Object> {
    return new Promise<object>((resolve, reject) => {
      this.customUserRepository.find(
        {where: {email: request.body.email}},
        function(err: any, userInstance: any) {
          if (userInstance.length > 0) {
            bcrypt.compare(
              request.body.password,
              userInstance[0].password,
              function(err: any, match: any) {
                if (match) {
                  resolve(userInstance[0]);
                } else {
                  let msg = {
                    error: {
                      message: 'login failed',
                    },
                  };
                  resolve(response.status(401).send(msg));
                }
              },
            );
          } else {
            let msg = {
              error: {
                message: 'login failed',
              },
            };
            resolve(response.status(401).send(msg));
          }
        },
      );
    });
  }

  @post('/custom-users/logout', {
    responses: {
      '200': {
        description: 'User logout success',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CustomUser, {partial: true}),
          },
        },
      },
    },
  })
  async logout(
    @requestBody() @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<void> {}
}
