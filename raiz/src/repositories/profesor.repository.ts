import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Profesor, ProfesorRelations, Estudiante} from '../models';
import {EstudianteRepository} from './estudiante.repository';

export class ProfesorRepository extends DefaultCrudRepository<
  Profesor,
  typeof Profesor.prototype.ID__Profesor,
  ProfesorRelations
> {

  public readonly estudiantes: HasManyRepositoryFactory<Estudiante, typeof Profesor.prototype.ID__Profesor>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Profesor, dataSource);
    this.estudiantes = this.createHasManyRepositoryFactoryFor('estudiantes', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiantes', this.estudiantes.inclusionResolver);
  }
}
