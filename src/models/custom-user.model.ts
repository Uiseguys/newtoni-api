import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CustomUser extends Entity {
  @property({
    type: 'object',
    default: {},
  })
  settings?: object;

  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  realm?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
    default: 0,
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
    default: null,
  })
  verificationToken?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CustomUser>) {
    super(data);
  }
}

export interface CustomUserRelations {
  // describe navigational properties here
}

export type CustomUserWithRelations = CustomUser & CustomUserRelations;
