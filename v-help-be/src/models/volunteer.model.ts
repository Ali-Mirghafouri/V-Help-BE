// Copyright z80lives <shath.ibrahim@gmail.com> 2022. All Rights Reserved.
// Node module: v-help-be
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {model, property, hasMany} from '@loopback/repository';
import {User} from '.';
import {Offer} from './offer.model';

@model()
export class Volunteer extends User {
  @property({
    type: 'date',
    required: true,
  })
  dateOfBirth: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  occupation: string;

  @hasMany(() => Offer)
  offers: Offer[];

  constructor(data?: Partial<Volunteer>) {
    super(data);
  }
}

export interface VolunteerRelations {
  // describe navigational properties here
}

export type VolunteerWithRelations = Volunteer & VolunteerRelations;
