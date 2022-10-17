import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {SchoolAdmin, SchoolAdminRelations} from '../models';

export class SchoolAdminRepository extends DefaultCrudRepository<
  SchoolAdmin,
  typeof SchoolAdmin.prototype.staffID,
  SchoolAdminRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(SchoolAdmin, dataSource);
  }
}
