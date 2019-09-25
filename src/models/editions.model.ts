import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Editions extends Entity {
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

  @property.array(Object, {required: true})
  image: object[] | void[];

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

  constructor(data?: Partial<Editions>) {
    super(data);
  }
}

export interface EditionsRelations {
  // describe navigational properties here
}

export type EditionsWithRelations = Editions & EditionsRelations;
