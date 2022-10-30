// Copyright z80lives <shath.ibrahim@gmail.com> 2022. All Rights Reserved.
// Node module: v-help-be
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property, hasMany} from '@loopback/repository';
import {ResourceRequest} from './resource-request.model';
import {TutorialRequest} from './tutorial-request.model';

@model()
export class School extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  schoolId?: string;

  @property({
    type: 'string',
    required: true,
  })
  schoolName: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @hasMany(() => ResourceRequest)
  resourceRequests: ResourceRequest[];

  @hasMany(() => TutorialRequest)
  tutorialRequests: TutorialRequest[];

  constructor(data?: Partial<School>) {
    super(data);
  }
}

export interface SchoolRelations {
  // describe navigational properties here
}

export type SchoolWithRelations = School & SchoolRelations;
