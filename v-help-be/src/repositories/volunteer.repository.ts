import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Volunteer, VolunteerRelations} from '../models';

export class VolunteerRepository extends DefaultCrudRepository<
  Volunteer,
  typeof Volunteer.prototype._id,
  VolunteerRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(Volunteer, dataSource);
  }
}
