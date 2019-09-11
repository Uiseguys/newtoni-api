import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Settings extends Entity {
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
    default: 0,
  })
  id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Settings>) {
    super(data);
  }
}

export interface SettingsRelations {
  // describe navigational properties here
}

export type SettingsWithRelations = Settings & SettingsRelations;
