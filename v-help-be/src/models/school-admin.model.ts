// Copyright z80lives <shath.ibrahim@gmail.com> 2022. All Rights Reserved.
// Node module: v-help-be
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {model, property} from '@loopback/repository';
import {User} from '.';

@model({settings: {strict: false}})
export class SchoolAdmin extends User {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  staffID?: string;

  @property({
    type: 'string',
    required: true,
  })
  position: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SchoolAdmin>) {
    super(data);
  }
}

export interface SchoolAdminRelations {
  // describe navigational properties here
}

export type SchoolAdminWithRelations = SchoolAdmin & SchoolAdminRelations;
