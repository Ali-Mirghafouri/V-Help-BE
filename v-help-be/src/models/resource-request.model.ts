// Copyright z80lives <shath.ibrahim@gmail.com> 2022. All Rights Reserved.
// Node module: v-help-be
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {model, property} from '@loopback/repository';
import {Request} from '.';

@model()
export class ResourceRequest extends Request {
  @property({
    type: 'string',
    required: true,
  })
  resourceType: string;


  // @property({
  @property({
    type: 'string',
  })
  schoolId?: string;
  //   type: 'string',
  //   id: true,
  //   generated: true,
  // })
  // _id?: string;

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
