import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Offer, OfferRelations, Volunteer} from '../models';
import {MainDataSource} from '../datasources';
import {VolunteerRepository} from './volunteer.repository';

export class OfferRepository extends DefaultCrudRepository<
  Offer,
  typeof Offer.prototype._id,
  OfferRelations
> {

  public readonly volunteer: BelongsToAccessor<Volunteer, typeof Offer.prototype._id>;

  constructor(
    @inject('datasources.main') dataSource: MainDataSource, @repository.getter('VolunteerRepository') protected volunteerRepositoryGetter: Getter<VolunteerRepository>,
  ) {
    super(Offer, dataSource);
    this.volunteer = this.createBelongsToAccessorFor('volunteer', volunteerRepositoryGetter,);
    this.registerInclusionResolver('volunteer', this.volunteer.inclusionResolver);
  }
}
