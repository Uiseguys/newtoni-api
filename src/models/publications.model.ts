import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Publications extends Entity {
  @property({
    type: 'number',
    generated: true,
    id: true,
  })
  id?: number;

  @property({
    type: 'object',
    default: {},
  })
  seo?: object;

  @property({
    type: 'string',
  })
  name: string;

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
    type: 'string',
  })
  description: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Publications>) {
    super(data);
  }
}

export interface PublicationsRelations {
  // describe navigational properties here
}

export type PublicationsWithRelations = Publications & PublicationsRelations;
