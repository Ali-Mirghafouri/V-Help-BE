/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Volunteer, '_id'>, schemaOptions: { title: 'NewVolunteer', exclude: [ '_id' ] })
 */
export interface NewVolunteer {
  dateOfBirth: string;
  email: string;
  fullname: string;
  occupation: string;
  password?: string;
  phone?: string;
  username: string;
}
