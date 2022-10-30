// Copyright z80lives <shath.ibrahim@gmail.com> 2022. All Rights Reserved.
// Node module: v-help-be
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property, hasMany} from '@loopback/repository';
import {Offer} from './offer.model';

@model({settings: {strict: false}})
export class Request extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  @property({
    type: 'string',
    id: true
  })
  requestID?: string;

  @property({
    type: 'date',
    required: true,
  })
  requestDate: string;

  @property({
    type: 'string',
    required: true,
  })
  requestStatus: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @hasMany(() => Offer)
  offers: Offer[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
