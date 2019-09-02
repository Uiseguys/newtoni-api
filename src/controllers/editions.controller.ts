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
import {Editions} from '../models';
import {EditionsRepository} from '../repositories';

export class EditionsController {
  constructor(
    @repository(EditionsRepository)
    public editionsRepository : EditionsRepository,
  ) {}

  @post('/editions', {
    responses: {
      '200': {
        description: 'Editions model instance',
        content: {'application/json': {schema: getModelSchemaRef(Editions)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Editions, {exclude: ['id']}),
        },
      },
    })
    editions: Omit<Editions, 'id'>,
  ): Promise<Editions> {
    return this.editionsRepository.create(editions);
  }

  @get('/editions/count', {
    responses: {
      '200': {
        description: 'Editions model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Editions)) where?: Where<Editions>,
  ): Promise<Count> {
    return this.editionsRepository.count(where);
  }

  @get('/editions', {
    responses: {
      '200': {
        description: 'Array of Editions model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Editions)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Editions)) filter?: Filter<Editions>,
  ): Promise<Editions[]> {
    return this.editionsRepository.find(filter);
  }

  @patch('/editions', {
    responses: {
      '200': {
        description: 'Editions PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Editions, {partial: true}),
        },
      },
    })
    editions: Editions,
    @param.query.object('where', getWhereSchemaFor(Editions)) where?: Where<Editions>,
  ): Promise<Count> {
    return this.editionsRepository.updateAll(editions, where);
  }

  @get('/editions/{id}', {
    responses: {
      '200': {
        description: 'Editions model instance',
        content: {'application/json': {schema: getModelSchemaRef(Editions)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Editions> {
    return this.editionsRepository.findById(id);
  }

  @patch('/editions/{id}', {
    responses: {
      '204': {
        description: 'Editions PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Editions, {partial: true}),
        },
      },
    })
    editions: Editions,
  ): Promise<void> {
    await this.editionsRepository.updateById(id, editions);
  }

  @put('/editions/{id}', {
    responses: {
      '204': {
        description: 'Editions PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() editions: Editions,
  ): Promise<void> {
    await this.editionsRepository.replaceById(id, editions);
  }

  @del('/editions/{id}', {
    responses: {
      '204': {
        description: 'Editions DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.editionsRepository.deleteById(id);
  }
}
