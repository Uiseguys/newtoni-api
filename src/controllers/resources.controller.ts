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
import {Resources} from '../models';
import {ResourcesRepository} from '../repositories';

export class ResourcesController {
  constructor(
    @repository(ResourcesRepository)
    public resourcesRepository : ResourcesRepository,
  ) {}

  @post('/resources', {
    responses: {
      '200': {
        description: 'Resources model instance',
        content: {'application/json': {schema: getModelSchemaRef(Resources)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resources, {exclude: ['id']}),
        },
      },
    })
    resources: Omit<Resources, 'id'>,
  ): Promise<Resources> {
    return this.resourcesRepository.create(resources);
  }

  @get('/resources/count', {
    responses: {
      '200': {
        description: 'Resources model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Resources)) where?: Where<Resources>,
  ): Promise<Count> {
    return this.resourcesRepository.count(where);
  }

  @get('/resources', {
    responses: {
      '200': {
        description: 'Array of Resources model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Resources)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Resources)) filter?: Filter<Resources>,
  ): Promise<Resources[]> {
    return this.resourcesRepository.find(filter);
  }

  @patch('/resources', {
    responses: {
      '200': {
        description: 'Resources PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resources, {partial: true}),
        },
      },
    })
    resources: Resources,
    @param.query.object('where', getWhereSchemaFor(Resources)) where?: Where<Resources>,
  ): Promise<Count> {
    return this.resourcesRepository.updateAll(resources, where);
  }

  @get('/resources/{id}', {
    responses: {
      '200': {
        description: 'Resources model instance',
        content: {'application/json': {schema: getModelSchemaRef(Resources)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Resources> {
    return this.resourcesRepository.findById(id);
  }

  @patch('/resources/{id}', {
    responses: {
      '204': {
        description: 'Resources PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resources, {partial: true}),
        },
      },
    })
    resources: Resources,
  ): Promise<void> {
    await this.resourcesRepository.updateById(id, resources);
  }

  @put('/resources/{id}', {
    responses: {
      '204': {
        description: 'Resources PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resources: Resources,
  ): Promise<void> {
    await this.resourcesRepository.replaceById(id, resources);
  }

  @del('/resources/{id}', {
    responses: {
      '204': {
        description: 'Resources DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resourcesRepository.deleteById(id);
  }
}
