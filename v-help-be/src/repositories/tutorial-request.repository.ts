import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {TutorialRequest, TutorialRequestRelations} from '../models';

export class TutorialRequestRepository extends DefaultCrudRepository<
  TutorialRequest,
  typeof TutorialRequest.prototype.requestID,
  TutorialRequestRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(TutorialRequest, dataSource);
  }
}
