// Copyright z80lives <shath.ibrahim@gmail.com> 2022. All Rights Reserved.
// Node module: v-help-be
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {model, property} from '@loopback/repository';
import {Request} from '.';

@model({settings: {strict: false}})
export class TutorialRequest extends Request {
  @property({
    type: 'date',
    required: true,
  })
  proposedDate: string;

  @property({
    type: 'string',
    required: true,
  })
  proposedTime: string;

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
  studentLevel: string;

  @property({
    type: 'number',
    required: true,
  })
  numStudents: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TutorialRequest>) {
    super(data);
  }
}

export interface TutorialRequestRelations {
  // describe navigational properties here
}

export type TutorialRequestWithRelations = TutorialRequest & TutorialRequestRelations;
