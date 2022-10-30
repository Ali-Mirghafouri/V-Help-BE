import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Offer, OfferRelations} from '../models';

export class OfferRepository extends DefaultCrudRepository<
  Offer,
  typeof Offer.prototype._id,
  OfferRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(Offer, dataSource);
  }
}
