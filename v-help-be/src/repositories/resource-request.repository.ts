import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {ResourceRequest, ResourceRequestRelations} from '../models';

export class ResourceRequestRepository extends DefaultCrudRepository<
  ResourceRequest,
  typeof ResourceRequest.prototype.requestID,
  ResourceRequestRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(ResourceRequest, dataSource);
  }
}
