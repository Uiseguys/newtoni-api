import { Model, model, Entity, property,belongsTo } from '@loopback/repository';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
  })
  name?: string;


  @property({
    type: 'number',
    id: true,
    default:0
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  price: number;


  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'boolean',
    required: true,
    default: true,
  })
  availability: boolean;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  content: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  priority: number;

  @property({
    type: 'number',
    default: 0,
  })
  no: number;

  @property({
    type: 'string'
  })
  description: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}