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
  Profesor,
  Estudiante,
} from '../models';
import {ProfesorRepository} from '../repositories';

export class ProfesorEstudianteController {
  constructor(
    @repository(ProfesorRepository) protected profesorRepository: ProfesorRepository,
  ) { }

  @get('/profesors/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Array of Profesor has many Estudiante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Estudiante>,
  ): Promise<Estudiante[]> {
    return this.profesorRepository.estudiantes(id).find(filter);
  }

  @post('/profesors/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Profesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estudiante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Profesor.prototype.ID__Profesor,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {
            title: 'NewEstudianteInProfesor',
            exclude: ['ID'],
            optional: ['profesorId']
          }),
        },
      },
    }) estudiante: Omit<Estudiante, 'ID'>,
  ): Promise<Estudiante> {
    return this.profesorRepository.estudiantes(id).create(estudiante);
  }

  @patch('/profesors/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Profesor.Estudiante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {partial: true}),
        },
      },
    })
    estudiante: Partial<Estudiante>,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.profesorRepository.estudiantes(id).patch(estudiante, where);
  }

  @del('/profesors/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Profesor.Estudiante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.profesorRepository.estudiantes(id).delete(where);
  }
}
