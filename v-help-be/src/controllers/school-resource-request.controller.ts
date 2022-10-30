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
  School,
  ResourceRequest,
} from '../models';
import {SchoolRepository} from '../repositories';

export class SchoolResourceRequestController {
  constructor(
    @repository(SchoolRepository) protected schoolRepository: SchoolRepository,
  ) { }

  @get('/schools/{id}/resource-requests', {
    responses: {
      '200': {
        description: 'Array of School has many ResourceRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ResourceRequest)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ResourceRequest>,
  ): Promise<ResourceRequest[]> {
    return this.schoolRepository.resourceRequests(id).find(filter);
  }

  @post('/schools/{id}/resource-requests', {
    responses: {
      '200': {
        description: 'School model instance',
        content: {'application/json': {schema: getModelSchemaRef(ResourceRequest)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof School.prototype.schoolId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResourceRequest, {
            title: 'NewResourceRequestInSchool',
            exclude: ['id'],
            optional: ['schoolId']
          }),
        },
      },
    }) resourceRequest: Omit<ResourceRequest, 'id'>,
  ): Promise<ResourceRequest> {
    return this.schoolRepository.resourceRequests(id).create(resourceRequest);
  }

  @patch('/schools/{id}/resource-requests', {
    responses: {
      '200': {
        description: 'School.ResourceRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResourceRequest, {partial: true}),
        },
      },
    })
    resourceRequest: Partial<ResourceRequest>,
    @param.query.object('where', getWhereSchemaFor(ResourceRequest)) where?: Where<ResourceRequest>,
  ): Promise<Count> {
    return this.schoolRepository.resourceRequests(id).patch(resourceRequest, where);
  }

  @del('/schools/{id}/resource-requests', {
    responses: {
      '200': {
        description: 'School.ResourceRequest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ResourceRequest)) where?: Where<ResourceRequest>,
  ): Promise<Count> {
    return this.schoolRepository.resourceRequests(id).delete(where);
  }
}
