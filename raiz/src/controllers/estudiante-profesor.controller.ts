import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Estudiante,
  Profesor,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteProfesorController {
  constructor(
    @repository(EstudianteRepository)
    public estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/profesor', {
    responses: {
      '200': {
        description: 'Profesor belonging to Estudiante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profesor)},
          },
        },
      },
    },
  })
  async getProfesor(
    @param.path.string('id') id: typeof Estudiante.prototype.ID,
  ): Promise<Profesor> {
    return this.estudianteRepository.profesor(id);
  }
}
