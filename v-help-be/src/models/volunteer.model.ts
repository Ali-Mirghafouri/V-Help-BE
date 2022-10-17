import {model, property} from '@loopback/repository';
import {User} from '.';

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


  constructor(data?: Partial<Volunteer>) {
    super(data);
  }
}

export interface VolunteerRelations {
  // describe navigational properties here
}

export type VolunteerWithRelations = Volunteer & VolunteerRelations;
