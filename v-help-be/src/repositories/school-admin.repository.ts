import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {SchoolAdmin, SchoolAdminRelations} from '../models';

export class SchoolAdminRepository extends DefaultCrudRepository<
  SchoolAdmin,
  typeof SchoolAdmin.prototype.staffID,
  SchoolAdminRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(SchoolAdmin, dataSource);
  }
}
