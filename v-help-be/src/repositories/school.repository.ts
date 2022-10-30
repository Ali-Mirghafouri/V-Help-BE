import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {School, SchoolRelations, ResourceRequest, TutorialRequest} from '../models';
import {ResourceRequestRepository} from './resource-request.repository';
import {TutorialRequestRepository} from './tutorial-request.repository';

export class SchoolRepository extends DefaultCrudRepository<
  School,
  typeof School.prototype.schoolId,
  SchoolRelations
> {

  public readonly resourceRequests: HasManyRepositoryFactory<ResourceRequest, typeof School.prototype.schoolId>;

  public readonly tutorialRequests: HasManyRepositoryFactory<TutorialRequest, typeof School.prototype.schoolId>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource, @repository.getter('ResourceRequestRepository') protected resourceRequestRepositoryGetter: Getter<ResourceRequestRepository>, @repository.getter('TutorialRequestRepository') protected tutorialRequestRepositoryGetter: Getter<TutorialRequestRepository>,
  ) {
    super(School, dataSource);
    this.tutorialRequests = this.createHasManyRepositoryFactoryFor('tutorialRequests', tutorialRequestRepositoryGetter,);
    this.registerInclusionResolver('tutorialRequests', this.tutorialRequests.inclusionResolver);
    this.resourceRequests = this.createHasManyRepositoryFactoryFor('resourceRequests', resourceRequestRepositoryGetter,);
    this.registerInclusionResolver('resourceRequests', this.resourceRequests.inclusionResolver);
  }
}
