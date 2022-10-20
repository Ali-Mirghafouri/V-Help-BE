import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SchoolAdmin,
  School,
} from '../models';
import {SchoolAdminRepository} from '../repositories';

export class SchoolAdminSchoolController {
  constructor(
    @repository(SchoolAdminRepository)
    public schoolAdminRepository: SchoolAdminRepository,
  ) { }

  @get('/school-admins/{id}/school', {
    responses: {
      '200': {
        description: 'School belonging to SchoolAdmin',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(School)},
          },
        },
      },
    },
  })
  async getSchool(
    @param.path.string('id') id: typeof SchoolAdmin.prototype._id,
  ): Promise<School> {
    return this.schoolAdminRepository.school(id);
  }
}
