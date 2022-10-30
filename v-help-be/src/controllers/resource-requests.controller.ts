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
import {ResourceRequest} from '../models';
import {ResourceRequestRepository} from '../repositories';

export class ResourceRequestsController {
  constructor(
    @repository(ResourceRequestRepository)
    public resourceRequestRepository : ResourceRequestRepository,
  ) {}

  @post('/resource-requests')
  @response(200, {
    description: 'ResourceRequest model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResourceRequest)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResourceRequest, {
            title: 'NewResourceRequest',
            exclude: ['id'],
          }),
        },
      },
    })
    resourceRequest: Omit<ResourceRequest, 'id'>,
  ): Promise<ResourceRequest> {
    return this.resourceRequestRepository.create(resourceRequest);
  }

  @get('/resource-requests/count')
  @response(200, {
    description: 'ResourceRequest model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResourceRequest) where?: Where<ResourceRequest>,
  ): Promise<Count> {
    return this.resourceRequestRepository.count(where);
  }

  @get('/resource-requests')
  @response(200, {
    description: 'Array of ResourceRequest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResourceRequest, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ResourceRequest) filter?: Filter<ResourceRequest>,
  ): Promise<ResourceRequest[]> {
    return this.resourceRequestRepository.find(filter);
  }

  @patch('/resource-requests')
  @response(200, {
    description: 'ResourceRequest PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResourceRequest, {partial: true}),
        },
      },
    })
    resourceRequest: ResourceRequest,
    @param.where(ResourceRequest) where?: Where<ResourceRequest>,
  ): Promise<Count> {
    return this.resourceRequestRepository.updateAll(resourceRequest, where);
  }

  @get('/resource-requests/{id}')
  @response(200, {
    description: 'ResourceRequest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResourceRequest, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ResourceRequest, {exclude: 'where'}) filter?: FilterExcludingWhere<ResourceRequest>
  ): Promise<ResourceRequest> {
    return this.resourceRequestRepository.findById(id, filter);
  }

  @patch('/resource-requests/{id}')
  @response(204, {
    description: 'ResourceRequest PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResourceRequest, {partial: true}),
        },
      },
    })
    resourceRequest: ResourceRequest,
  ): Promise<void> {
    await this.resourceRequestRepository.updateById(id, resourceRequest);
  }

  @put('/resource-requests/{id}')
  @response(204, {
    description: 'ResourceRequest PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() resourceRequest: ResourceRequest,
  ): Promise<void> {
    await this.resourceRequestRepository.replaceById(id, resourceRequest);
  }

  @del('/resource-requests/{id}')
  @response(204, {
    description: 'ResourceRequest DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.resourceRequestRepository.deleteById(id);
  }
}
