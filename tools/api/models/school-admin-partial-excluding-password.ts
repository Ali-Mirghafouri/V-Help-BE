/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Partial<SchoolAdmin>, 'password'>, schemaOptions: { partial: true, exclude: [ 'password' ] })
 */
export interface SchoolAdminPartialExcludingPassword {
  '_id'?: string;
  email?: string;
  fullname?: string;
  phone?: string;
  position?: string;
  schoolId?: string;
  staffID?: string;
  username?: string;

  [key: string]: any;
}
