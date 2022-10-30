// Copyright z80lives <shath.ibrahim@gmail.com> 2022. All Rights Reserved.
// Node module: v-help-be
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property} from '@loopback/repository';

@model()
export class Offer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'date',
    required: true,
  })
  offerDate: string;

  @property({
    type: 'string',
    required: true,
  })
  remarks: string;

  @property({
    type: 'string',
    required: true,
  })
  offerStatus: string;

  @property({
    type: 'string',
  })
  requestId?: string;

  @property({
    type: 'string',
  })
  volunteerId?: string;

  constructor(data?: Partial<Offer>) {
    super(data);
  }
}

export interface OfferRelations {
  // describe navigational properties here
}

export type OfferWithRelations = Offer & OfferRelations;
