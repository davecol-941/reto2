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
import {Profesor} from '../models';
import {ProfesorRepository} from '../repositories';

export class ProfesorController {
  constructor(
    @repository(ProfesorRepository)
    public profesorRepository : ProfesorRepository,
  ) {}

  @post('/profesors')
  @response(200, {
    description: 'Profesor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Profesor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {
            title: 'NewProfesor',
            exclude: ['ID__Profesor'],
          }),
        },
      },
    })
    profesor: Omit<Profesor, 'ID__Profesor'>,
  ): Promise<Profesor> {
    return this.profesorRepository.create(profesor);
  }

  @get('/profesors/count')
  @response(200, {
    description: 'Profesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Profesor) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.profesorRepository.count(where);
  }

  @get('/profesors')
  @response(200, {
    description: 'Array of Profesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Profesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Profesor) filter?: Filter<Profesor>,
  ): Promise<Profesor[]> {
    return this.profesorRepository.find(filter);
  }

  @patch('/profesors')
  @response(200, {
    description: 'Profesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {partial: true}),
        },
      },
    })
    profesor: Profesor,
    @param.where(Profesor) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.profesorRepository.updateAll(profesor, where);
  }

  @get('/profesors/{ID__Profesor}')
  @response(200, {
    description: 'Profesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Profesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('ID__Profesor') ID__Profesor: string,
    @param.filter(Profesor, {exclude: 'where'}) filter?: FilterExcludingWhere<Profesor>
  ): Promise<Profesor> {
    return this.profesorRepository.findById(ID__Profesor, filter);
  }

  @patch('/profesors/{ID__Profesor}')
  @response(204, {
    description: 'Profesor PATCH success',
  })
  async updateById(
    @param.path.string('ID__Profesor') ID__Profesor: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {partial: true}),
        },
      },
    })
    profesor: Profesor,
  ): Promise<void> {
    await this.profesorRepository.updateById(ID__Profesor, profesor);
  }

  @put('/profesors/{ID__Profesor}')
  @response(204, {
    description: 'Profesor PUT success',
  })
  async replaceById(
    @param.path.string('ID__Profesor') ID__Profesor: string,
    @requestBody() profesor: Profesor,
  ): Promise<void> {
    await this.profesorRepository.replaceById(ID__Profesor, profesor);
  }

  @del('/profesors/{id}')
  @response(204, {
    description: 'Profesor DELETE success',
  })
  async deleteById(@param.path.string('ID__Profesor') ID__Profesor: string): Promise<void> {
    await this.profesorRepository.deleteById(ID__Profesor);
  }
}
