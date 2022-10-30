import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Offer, OfferRelations} from '../models';
import {MainDataSource} from '../datasources';

export class OfferRepository extends DefaultCrudRepository<
  Offer,
  typeof Offer.prototype._id,
  OfferRelations
> {
  constructor(
    @inject('datasources.') dataSource: MainDataSource,
  ) {
    super(Offer, dataSource);
  }
}
