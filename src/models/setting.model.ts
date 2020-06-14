import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class Setting extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  key: string;

  @property({
    type: 'object',
    default: {},
  })
  value?: object;

  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Setting>) {
    super(data);
  }
}

export interface SettingRelations {
  // describe navigational properties here
}

export type SettingWithRelations = Setting & SettingRelations;
