import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {TutorialRequest, TutorialRequestRelations} from '../models';

export class TutorialRequestRepository extends DefaultCrudRepository<
  TutorialRequest,
  typeof TutorialRequest.prototype.id,
  TutorialRequestRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(TutorialRequest, dataSource);
  }
}
