import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Volunteer,
  Offer,
} from '../models';
import {VolunteerRepository} from '../repositories';

export class VolunteerOfferController {
  constructor(
    @repository(VolunteerRepository) protected volunteerRepository: VolunteerRepository,
  ) { }

  @get('/volunteers/{id}/offers', {
    responses: {
      '200': {
        description: 'Array of Volunteer has many Offer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Offer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Offer>,
  ): Promise<Offer[]> {
    return this.volunteerRepository.offers(id).find(filter);
  }

  @post('/volunteers/{id}/offers', {
    responses: {
      '200': {
        description: 'Volunteer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Offer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Volunteer.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {
            title: 'NewOfferInVolunteer',
            exclude: ['_id'],
            optional: ['volunteerId']
          }),
        },
      },
    }) offer: Omit<Offer, '_id'>,
  ): Promise<Offer> {
    return this.volunteerRepository.offers(id).create(offer);
  }

  @patch('/volunteers/{id}/offers', {
    responses: {
      '200': {
        description: 'Volunteer.Offer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {partial: true}),
        },
      },
    })
    offer: Partial<Offer>,
    @param.query.object('where', getWhereSchemaFor(Offer)) where?: Where<Offer>,
  ): Promise<Count> {
    return this.volunteerRepository.offers(id).patch(offer, where);
  }

  @del('/volunteers/{id}/offers', {
    responses: {
      '200': {
        description: 'Volunteer.Offer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Offer)) where?: Where<Offer>,
  ): Promise<Count> {
    return this.volunteerRepository.offers(id).delete(where);
  }
}
