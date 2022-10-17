import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {Volunteer, VolunteerRelations} from '../models';

export class VolunteerRepository extends DefaultCrudRepository<
  Volunteer,
  typeof Volunteer.prototype._id,
  VolunteerRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(Volunteer, dataSource);
  }
}
