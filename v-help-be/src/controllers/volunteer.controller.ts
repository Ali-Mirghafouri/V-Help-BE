import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Volunteer} from '../models';
import {VolunteerRepository} from '../repositories';

export class VolunteerController {
  constructor(
    @repository(VolunteerRepository)
    public volunteerRepository : VolunteerRepository,
  ) {}

  @post('/volunteers')
  @response(200, {
    description: 'Volunteer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Volunteer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Volunteer, {
            title: 'NewVolunteer',
            exclude: ['_id'],
          }),
        },
      },
    })
    volunteer: Omit<Volunteer, '_id'>,
  ): Promise<Volunteer> {
    return this.volunteerRepository.create(volunteer);
  }

  @get('/volunteers/count')
  @response(200, {
    description: 'Volunteer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Volunteer) where?: Where<Volunteer>,
  ): Promise<Count> {
    return this.volunteerRepository.count(where);
  }

  @get('/volunteers')
  @response(200, {
    description: 'Array of Volunteer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Volunteer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Volunteer) filter?: Filter<Volunteer>,
  ): Promise<Volunteer[]> {
    return this.volunteerRepository.find(filter);
  }

  @patch('/volunteers')
  @response(200, {
    description: 'Volunteer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Volunteer, {partial: true}),
        },
      },
    })
    volunteer: Volunteer,
    @param.where(Volunteer) where?: Where<Volunteer>,
  ): Promise<Count> {
    return this.volunteerRepository.updateAll(volunteer, where);
  }

  @get('/volunteers/{id}')
  @response(200, {
    description: 'Volunteer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Volunteer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Volunteer, {exclude: 'where'}) filter?: FilterExcludingWhere<Volunteer>
  ): Promise<Volunteer> {
    return this.volunteerRepository.findById(id, filter);
  }

  @patch('/volunteers/{id}')
  @response(204, {
    description: 'Volunteer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Volunteer, {partial: true}),
        },
      },
    })
    volunteer: Volunteer,
  ): Promise<void> {
    await this.volunteerRepository.updateById(id, volunteer);
  }

  @put('/volunteers/{id}')
  @response(204, {
    description: 'Volunteer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() volunteer: Volunteer,
  ): Promise<void> {
    await this.volunteerRepository.replaceById(id, volunteer);
  }

  @del('/volunteers/{id}')
  @response(204, {
    description: 'Volunteer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.volunteerRepository.deleteById(id);
  }
}
