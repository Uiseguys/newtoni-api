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
import {inject} from '@loopback/context';
import {Edition} from '../models';
import {EditionRepository} from '../repositories';
import {AuthenticationBindings, authenticate} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';

export class EditionsController {
  constructor(
    @repository(EditionRepository)
    public editionRepository: EditionRepository,
    @inject(AuthenticationBindings.CURRENT_USER, {optional: true})
    private user: UserProfile,
  ) {}

  @authenticate('BasicStrategy')
  @post('/editions', {
    responses: {
      '200': {
        description: 'Editions model instance',
        content: {'application/json': {schema: getModelSchemaRef(Edition)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Edition, {exclude: ['id']}),
        },
      },
    })
    edition: Omit<Edition, 'id'>,
  ): Promise<Edition> {
    return this.editionRepository.create(edition);
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
    @param.query.object('where', getWhereSchemaFor(Edition))
    where?: Where<Edition>,
  ): Promise<Count> {
    return this.editionRepository.count(where);
  }

  @get('/editions', {
    responses: {
      '200': {
        description: 'Array of Editions model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Edition)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Edition))
    filter?: Filter<Edition>,
  ): Promise<Edition[]> {
    return this.editionRepository.find(filter);
  }

  @authenticate('BasicStrategy')
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
          schema: getModelSchemaRef(Edition, {partial: true}),
        },
      },
    })
    edition: Edition,
    @param.query.object('where', getWhereSchemaFor(Edition))
    where?: Where<Edition>,
  ): Promise<Count> {
    return this.editionRepository.updateAll(edition, where);
  }

  @get('/editions/{id}', {
    responses: {
      '200': {
        description: 'Editions model instance',
        content: {'application/json': {schema: getModelSchemaRef(Edition)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Edition> {
    return this.editionRepository.findById(id);
  }

  @authenticate('BasicStrategy')
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
          schema: getModelSchemaRef(Edition, {partial: true}),
        },
      },
    })
    edition: Edition,
  ): Promise<void> {
    await this.editionRepository.updateById(id, edition);
  }

  @authenticate('BasicStrategy')
  @put('/editions/{id}', {
    responses: {
      '204': {
        description: 'Editions PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() edition: Edition,
  ): Promise<void> {
    await this.editionRepository.replaceById(id, edition);
  }

  @authenticate('BasicStrategy')
  @del('/editions/{id}', {
    responses: {
      '204': {
        description: 'Editions DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.editionRepository.deleteById(id);
  }
}
