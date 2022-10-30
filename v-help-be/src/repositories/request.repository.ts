import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Request, RequestRelations, Offer} from '../models';
import {OfferRepository} from './offer.repository';
import {MainDataSource} from '../datasources';

export class RequestRepository extends DefaultCrudRepository<
  Request,
  typeof Request.prototype.id,
  RequestRelations
> {

  public readonly offers: HasManyRepositoryFactory<Offer, typeof Request.prototype.id>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource, @repository.getter('OfferRepository') protected offerRepositoryGetter: Getter<OfferRepository>,
  ) {
    super(Request, dataSource);
    this.offers = this.createHasManyRepositoryFactoryFor('offers', offerRepositoryGetter,);
    this.registerInclusionResolver('offers', this.offers.inclusionResolver);
  }
}
