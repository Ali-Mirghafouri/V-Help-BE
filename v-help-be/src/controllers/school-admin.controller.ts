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
import {SchoolAdmin} from '../models';
import {SchoolAdminRepository} from '../repositories';

export class SchoolAdminController {
  constructor(
    @repository(SchoolAdminRepository)
    public schoolAdminRepository : SchoolAdminRepository,
  ) {}

  // @post('/school-admins')
  // @response(200, {
  //   description: 'SchoolAdmin model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(SchoolAdmin)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(SchoolAdmin, {
  //           title: 'NewSchoolAdmin',
  //           exclude: ['_id'],
  //         }),
  //       },
  //     },
  //   })
  //   schoolAdmin: Omit<SchoolAdmin, '_id'>,
  // ): Promise<SchoolAdmin> {
  //   return this.schoolAdminRepository.create(schoolAdmin);
  // }

  @get('/school-admins/count')
  @response(200, {
    description: 'SchoolAdmin model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SchoolAdmin) where?: Where<SchoolAdmin>,
  ): Promise<Count> {
    return this.schoolAdminRepository.count(where);
  }

  @get('/school-admins')
  @response(200, {
    description: 'Array of SchoolAdmin model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SchoolAdmin, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SchoolAdmin) filter?: Filter<SchoolAdmin>,
  ): Promise<SchoolAdmin[]> {
    return this.schoolAdminRepository.find(filter);
  }

  @patch('/school-admins')
  @response(200, {
    description: 'SchoolAdmin PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SchoolAdmin, {partial: true}),
        },
      },
    })
    schoolAdmin: SchoolAdmin,
    @param.where(SchoolAdmin) where?: Where<SchoolAdmin>,
  ): Promise<Count> {
    return this.schoolAdminRepository.updateAll(schoolAdmin, where);
  }

  @get('/school-admins/{id}')
  @response(200, {
    description: 'SchoolAdmin model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SchoolAdmin, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SchoolAdmin, {exclude: 'where'}) filter?: FilterExcludingWhere<SchoolAdmin>
  ): Promise<SchoolAdmin> {
    return this.schoolAdminRepository.findById(id, filter);
  }

  @patch('/school-admins/{id}')
  @response(204, {
    description: 'SchoolAdmin PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SchoolAdmin, {partial: true}),
        },
      },
    })
    schoolAdmin: SchoolAdmin,
  ): Promise<void> {
    await this.schoolAdminRepository.updateById(id, schoolAdmin);
  }

  @put('/school-admins/{id}')
  @response(204, {
    description: 'SchoolAdmin PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() schoolAdmin: SchoolAdmin,
  ): Promise<void> {
    await this.schoolAdminRepository.replaceById(id, schoolAdmin);
  }

  @del('/school-admins/{id}')
  @response(204, {
    description: 'SchoolAdmin DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.schoolAdminRepository.deleteById(id);
  }
}
