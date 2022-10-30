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
import {TutorialRequest} from '../models';
import {TutorialRequestRepository} from '../repositories';

export class TutorialsRequestsController {
  constructor(
    @repository(TutorialRequestRepository)
    public tutorialRequestRepository : TutorialRequestRepository,
  ) {}

  @post('/tutorial-requests')
  @response(200, {
    description: 'TutorialRequest model instance',
    content: {'application/json': {schema: getModelSchemaRef(TutorialRequest)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TutorialRequest, {
            title: 'NewTutorialRequest',
            exclude: ['id'],
          }),
        },
      },
    })
    tutorialRequest: Omit<TutorialRequest, 'id'>,
  ): Promise<TutorialRequest> {
    return this.tutorialRequestRepository.create(tutorialRequest);
  }

  @get('/tutorial-requests/count')
  @response(200, {
    description: 'TutorialRequest model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TutorialRequest) where?: Where<TutorialRequest>,
  ): Promise<Count> {
    return this.tutorialRequestRepository.count(where);
  }

  @get('/tutorial-requests')
  @response(200, {
    description: 'Array of TutorialRequest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TutorialRequest, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TutorialRequest) filter?: Filter<TutorialRequest>,
  ): Promise<TutorialRequest[]> {
    return this.tutorialRequestRepository.find(filter);
  }

  @patch('/tutorial-requests')
  @response(200, {
    description: 'TutorialRequest PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TutorialRequest, {partial: true}),
        },
      },
    })
    tutorialRequest: TutorialRequest,
    @param.where(TutorialRequest) where?: Where<TutorialRequest>,
  ): Promise<Count> {
    return this.tutorialRequestRepository.updateAll(tutorialRequest, where);
  }

  @get('/tutorial-requests/{id}')
  @response(200, {
    description: 'TutorialRequest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TutorialRequest, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TutorialRequest, {exclude: 'where'}) filter?: FilterExcludingWhere<TutorialRequest>
  ): Promise<TutorialRequest> {
    return this.tutorialRequestRepository.findById(id, filter);
  }

  @patch('/tutorial-requests/{id}')
  @response(204, {
    description: 'TutorialRequest PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TutorialRequest, {partial: true}),
        },
      },
    })
    tutorialRequest: TutorialRequest,
  ): Promise<void> {
    await this.tutorialRequestRepository.updateById(id, tutorialRequest);
  }

  @put('/tutorial-requests/{id}')
  @response(204, {
    description: 'TutorialRequest PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tutorialRequest: TutorialRequest,
  ): Promise<void> {
    await this.tutorialRequestRepository.replaceById(id, tutorialRequest);
  }

  @del('/tutorial-requests/{id}')
  @response(204, {
    description: 'TutorialRequest DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tutorialRequestRepository.deleteById(id);
  }
}
