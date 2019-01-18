import {Entity, model, property} from '@loopback/repository';

@model()
export class Newsletter extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  email: string;

  @property({
    type: 'boolean',
    default: true,
  })
  isSubscribed?: boolean;

  constructor(data?: Partial<Newsletter>) {
    super(data);
  }
}
