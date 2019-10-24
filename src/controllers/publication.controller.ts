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
import {Publication} from '../models';
import {PublicationRepository} from '../repositories';
import {AuthenticationBindings, authenticate} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';

export class PublicationsController {
  constructor(
    @repository(PublicationRepository)
    public publicationRepository: PublicationRepository,
    @inject(AuthenticationBindings.CURRENT_USER, {optional: true})
    private user: UserProfile,
  ) {}

  @authenticate('BasicStrategy')
  @post('/publications', {
    responses: {
      '200': {
        description: 'Publications model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publication)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {exclude: ['id']}),
        },
      },
    })
    publication: Omit<Publication, 'id'>,
  ): Promise<Publication> {
    return this.publicationRepository.create(publication);
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
    @param.query.object('where', getWhereSchemaFor(Publication))
    where?: Where<Publication>,
  ): Promise<Count> {
    return this.publicationRepository.count(where);
  }

  @get('/publications', {
    responses: {
      '200': {
        description: 'Array of Publications model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publication)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Publication))
    filter?: Filter<Publication>,
  ): Promise<Publication[]> {
    return this.publicationRepository.find(filter);
  }

  @authenticate('BasicStrategy')
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
          schema: getModelSchemaRef(Publication, {partial: true}),
        },
      },
    })
    publication: Publication,
    @param.query.object('where', getWhereSchemaFor(Publication))
    where?: Where<Publication>,
  ): Promise<Count> {
    return this.publicationRepository.updateAll(publication, where);
  }

  @get('/publications/{id}', {
    responses: {
      '200': {
        description: 'Publications model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publication)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Publication> {
    return this.publicationRepository.findById(id);
  }

  @authenticate('BasicStrategy')
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
          schema: getModelSchemaRef(Publication, {partial: true}),
        },
      },
    })
    publication: Publication,
  ): Promise<void> {
    await this.publicationRepository.updateById(id, publication);
  }

  @authenticate('BasicStrategy')
  @put('/publications/{id}', {
    responses: {
      '204': {
        description: 'Publications PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() publication: Publication,
  ): Promise<void> {
    await this.publicationRepository.replaceById(id, publication);
  }

  @authenticate('BasicStrategy')
  @del('/publications/{id}', {
    responses: {
      '204': {
        description: 'Publications DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.publicationRepository.deleteById(id);
  }
}
