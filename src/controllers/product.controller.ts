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
  Response,
  Request,
  RestBindings
} from '@loopback/rest';
import { inject } from '@loopback/context';
import { Product } from '../models';
import { ProductRepository } from '../repositories';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,

    @inject(AuthenticationBindings.CURRENT_USER, { optional: true }) private user: UserProfile
  ) { }

  @authenticate('BasicStrategy')
  @post('/Products', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Product } } },
      },
    },
  })
  async create(@requestBody() product: Product, @inject(RestBindings.Http.REQUEST) request: Request, @inject(RestBindings.Http.RESPONSE) response: Response): Promise<Product> {
    product.id = Math.floor(1000 + Math.random() * 9000);
    return await this.productRepository.create(product);
  }


  @authenticate('BasicStrategy')
  @get('/Products/count', {
    responses: {
      '200': {
        description: 'Product model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where,
  ): Promise<Count> {
    return await this.productRepository.count(where);
  }


  @get('/Products', {
    responses: {
      '200': {
        description: 'Array of Product model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Product } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Product)) filter?: Filter,
  ): Promise<object> {
    let self = this
    let finaldata: any = [];
    return new Promise<object>((resolve, reject) => {
      this.productRepository.find(filter, function (err: any, product: any) {

        resolve(product);

      })
    });
  }


  @patch('/Products', {
    responses: {
      '200': {
        description: 'Product PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() product: Product,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where,
  ): Promise<Count> {
    return await this.productRepository.updateAll(product, where);
  }


  @get('/Products/{id}', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Product } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Product> {
    return await this.productRepository.findById(id);
  }

  @authenticate('BasicStrategy')
  @patch('/Products/{id}', {
    responses: {
      '204': {
        description: 'Product PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() product: Product,
  ): Promise<void> {
    await this.productRepository.updateById(id, product);
  }

  @authenticate('BasicStrategy')
  @del('/Products/{id}', {
    responses: {
      '204': {
        description: 'Product DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
