/* tslint:disable */
/* eslint-disable */
import { SchoolWithRelations } from './school-with-relations';

/**
 * (tsType: SchoolAdminWithRelations, schemaOptions: { includeRelations: true })
 */
export interface SchoolAdminWithRelations {
  '_id'?: string;
  email: string;
  fullname: string;
  password?: string;
  phone?: string;
  position: string;
  school?: SchoolWithRelations;
  schoolId?: string;
  staffID?: string;
  username: string;

  [key: string]: any;
}
