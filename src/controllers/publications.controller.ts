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
import {Publications} from '../models';
import {PublicationsRepository} from '../repositories';

export class PublicationsController {
  constructor(
    @repository(PublicationsRepository)
    public publicationsRepository : PublicationsRepository,
  ) {}

  @post('/publications', {
    responses: {
      '200': {
        description: 'Publications model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publications)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publications, {exclude: ['id']}),
        },
      },
    })
    publications: Omit<Publications, 'id'>,
  ): Promise<Publications> {
    return this.publicationsRepository.create(publications);
  }

  @get('/publications/count', {
    responses: {
      '200': {
        description: 'Publications model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Publications)) where?: Where<Publications>,
  ): Promise<Count> {
    return this.publicationsRepository.count(where);
  }

  @get('/publications', {
    responses: {
      '200': {
        description: 'Array of Publications model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publications)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Publications)) filter?: Filter<Publications>,
  ): Promise<Publications[]> {
    return this.publicationsRepository.find(filter);
  }

  @patch('/publications', {
    responses: {
      '200': {
        description: 'Publications PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publications, {partial: true}),
        },
      },
    })
    publications: Publications,
    @param.query.object('where', getWhereSchemaFor(Publications)) where?: Where<Publications>,
  ): Promise<Count> {
    return this.publicationsRepository.updateAll(publications, where);
  }

  @get('/publications/{id}', {
    responses: {
      '200': {
        description: 'Publications model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publications)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Publications> {
    return this.publicationsRepository.findById(id);
  }

  @patch('/publications/{id}', {
    responses: {
      '204': {
        description: 'Publications PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publications, {partial: true}),
        },
      },
    })
    publications: Publications,
  ): Promise<void> {
    await this.publicationsRepository.updateById(id, publications);
  }

  @put('/publications/{id}', {
    responses: {
      '204': {
        description: 'Publications PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() publications: Publications,
  ): Promise<void> {
    await this.publicationsRepository.replaceById(id, publications);
  }

  @del('/publications/{id}', {
    responses: {
      '204': {
        description: 'Publications DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.publicationsRepository.deleteById(id);
  }
}
