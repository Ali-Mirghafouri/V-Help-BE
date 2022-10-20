import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {SchoolAdmin, SchoolAdminRelations, School} from '../models';
import {SchoolRepository} from './school.repository';

export class SchoolAdminRepository extends DefaultCrudRepository<
  SchoolAdmin,
  typeof SchoolAdmin.prototype.staffID,
  SchoolAdminRelations
> {

  public readonly school: BelongsToAccessor<School, typeof SchoolAdmin.prototype._id>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource, @repository.getter('SchoolRepository') protected schoolRepositoryGetter: Getter<SchoolRepository>,
  ) {
    super(SchoolAdmin, dataSource);
    this.school = this.createBelongsToAccessorFor('school', schoolRepositoryGetter,);
    this.registerInclusionResolver('school', this.school.inclusionResolver);
  }
}
