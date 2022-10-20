/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<SchoolAdmin, '_id'>, schemaOptions: { title: 'NewSchoolAdmin', exclude: [ '_id' ] })
 */
export interface NewSchoolAdmin {
  email: string;
  fullname: string;
  password?: string;
  phone?: string;
  position: string;
  schoolId?: string;
  staffID?: string;
  username: string;

  [key: string]: any;
}
