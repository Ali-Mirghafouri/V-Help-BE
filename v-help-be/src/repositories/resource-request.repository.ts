import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {ResourceRequest, ResourceRequestRelations} from '../models';

export class ResourceRequestRepository extends DefaultCrudRepository<
  ResourceRequest,
  typeof ResourceRequest.prototype.id,
  ResourceRequestRelations
> {
  constructor(
    @inject('datasources.main') dataSource: MainDataSource,
  ) {
    super(ResourceRequest, dataSource);
  }
}
