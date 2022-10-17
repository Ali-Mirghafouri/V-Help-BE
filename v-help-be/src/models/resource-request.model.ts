import {model, property} from '@loopback/repository';
import {Request} from '.';

@model()
export class ResourceRequest extends Request {
  @property({
    type: 'string',
    required: true,
  })
  resourceType: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
    required: true,
  })
  numRequired: number;


  constructor(data?: Partial<ResourceRequest>) {
    super(data);
  }
}

export interface ResourceRequestRelations {
  // describe navigational properties here
}

export type ResourceRequestWithRelations = ResourceRequest & ResourceRequestRelations;
