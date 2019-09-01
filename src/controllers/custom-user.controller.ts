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
} from '@loopback/rest';
import {CustomUser} from '../models';
import {CustomUserRepository} from '../repositories';

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
  async findById(@param.path.string('id') id: string): Promise<CustomUser> {
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
    @param.path.string('id') id: string,
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
    @param.path.string('id') id: string,
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
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.customUserRepository.deleteById(id);
  }
}
