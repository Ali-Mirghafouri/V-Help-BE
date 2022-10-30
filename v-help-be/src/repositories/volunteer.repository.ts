import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MainDataSource} from '../datasources';
import {Volunteer, VolunteerRelations, Offer} from '../models';
import {OfferRepository} from './offer.repository';

export class VolunteerRepository extends DefaultCrudRepository<
  Volunteer,
  typeof Volunteer.prototype._id,
  VolunteerRelations
> {

  public readonly offers: HasManyRepositoryFactory<Offer, typeof Volunteer.prototype._id>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource, @repository.getter('OfferRepository') protected offerRepositoryGetter: Getter<OfferRepository>,
  ) {
    super(Volunteer, dataSource);
    this.offers = this.createHasManyRepositoryFactoryFor('offers', offerRepositoryGetter,);
    this.registerInclusionResolver('offers', this.offers.inclusionResolver);
  }
}
