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
  Request,
  Offer,
} from '../models';
import {RequestRepository} from '../repositories';

export class RequestOfferController {
  constructor(
    @repository(RequestRepository) protected requestRepository: RequestRepository,
  ) { }

  @get('/requests/{id}/offers', {
    responses: {
      '200': {
        description: 'Array of Request has many Offer',
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
    return this.requestRepository.offers(id).find(filter);
  }

  @post('/requests/{id}/offers', {
    responses: {
      '200': {
        description: 'Request model instance',
        content: {'application/json': {schema: getModelSchemaRef(Offer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Request.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Offer, {
            title: 'NewOfferInRequest',
            exclude: ['_id'],
            optional: ['requestId']
          }),
        },
      },
    }) offer: Omit<Offer, '_id'>,
  ): Promise<Offer> {
    return this.requestRepository.offers(id).create(offer);
  }

  @patch('/requests/{id}/offers', {
    responses: {
      '200': {
        description: 'Request.Offer PATCH success count',
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
    return this.requestRepository.offers(id).patch(offer, where);
  }

  @del('/requests/{id}/offers', {
    responses: {
      '200': {
        description: 'Request.Offer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Offer)) where?: Where<Offer>,
  ): Promise<Count> {
    return this.requestRepository.offers(id).delete(where);
  }
}
