import {Entity, model, property} from '@loopback/repository';

@model()
export class School extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  schoolID?: string;

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


  constructor(data?: Partial<School>) {
    super(data);
  }
}

export interface SchoolRelations {
  // describe navigational properties here
}

export type SchoolWithRelations = School & SchoolRelations;
