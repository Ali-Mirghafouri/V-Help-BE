import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {School, SchoolRelations} from '../models';

export class SchoolRepository extends DefaultCrudRepository<
  School,
  typeof School.prototype.schoolID,
  SchoolRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(School, dataSource);
  }
}
