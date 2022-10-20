import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {School, SchoolRelations} from '../models';

export class SchoolRepository extends DefaultCrudRepository<
  School,
  typeof School.prototype.schoolId,
  SchoolRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(School, dataSource);
  }
}
