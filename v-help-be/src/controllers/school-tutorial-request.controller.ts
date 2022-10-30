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
  TutorialRequest,
} from '../models';
import {SchoolRepository} from '../repositories';

export class SchoolTutorialRequestController {
  constructor(
    @repository(SchoolRepository) protected schoolRepository: SchoolRepository,
  ) { }

  @get('/schools/{id}/tutorial-requests', {
    responses: {
      '200': {
        description: 'Array of School has many TutorialRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TutorialRequest)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TutorialRequest>,
  ): Promise<TutorialRequest[]> {
    return this.schoolRepository.tutorialRequests(id).find(filter);
  }

  @post('/schools/{id}/tutorial-requests', {
    responses: {
      '200': {
        description: 'School model instance',
        content: {'application/json': {schema: getModelSchemaRef(TutorialRequest)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof School.prototype.schoolId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TutorialRequest, {
            title: 'NewTutorialRequestInSchool',
            exclude: ['id'],
            optional: ['schoolId']
          }),
        },
      },
    }) tutorialRequest: Omit<TutorialRequest, 'id'>,
  ): Promise<TutorialRequest> {
    return this.schoolRepository.tutorialRequests(id).create(tutorialRequest);
  }

  @patch('/schools/{id}/tutorial-requests', {
    responses: {
      '200': {
        description: 'School.TutorialRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TutorialRequest, {partial: true}),
        },
      },
    })
    tutorialRequest: Partial<TutorialRequest>,
    @param.query.object('where', getWhereSchemaFor(TutorialRequest)) where?: Where<TutorialRequest>,
  ): Promise<Count> {
    return this.schoolRepository.tutorialRequests(id).patch(tutorialRequest, where);
  }

  @del('/schools/{id}/tutorial-requests', {
    responses: {
      '200': {
        description: 'School.TutorialRequest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TutorialRequest)) where?: Where<TutorialRequest>,
  ): Promise<Count> {
    return this.schoolRepository.tutorialRequests(id).delete(where);
  }
}
