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
    default: '{}',
  })
  seo?: object;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  author: string;

  @property({
    type: 'string',
    required: true,
  })
  post: string;

  @property({
    type: 'date',
    default: '$now',
  })
  create_time?: string;

  @property({
    type: 'date',
    default: '$now',
  })
  update_time?: string;

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
