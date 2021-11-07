import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Estudiante, EstudianteRelations, Profesor} from '../models';
import {ProfesorRepository} from './profesor.repository';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.ID,
  EstudianteRelations
> {

  public readonly profesor: BelongsToAccessor<Profesor, typeof Estudiante.prototype.ID>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ProfesorRepository') protected profesorRepositoryGetter: Getter<ProfesorRepository>,
  ) {
    super(Estudiante, dataSource);
    this.profesor = this.createBelongsToAccessorFor('profesor', profesorRepositoryGetter,);
    this.registerInclusionResolver('profesor', this.profesor.inclusionResolver);
  }
}
