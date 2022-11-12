import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Offer,
  Volunteer,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferVolunteerController {
  constructor(
    @repository(OfferRepository)
    public offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/volunteer', {
    responses: {
      '200': {
        description: 'Volunteer belonging to Offer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Volunteer)},
          },
        },
      },
    },
  })
  async getVolunteer(
    @param.path.string('id') id: typeof Offer.prototype._id,
  ): Promise<Volunteer> {
    return this.offerRepository.volunteer(id);
  }
}
