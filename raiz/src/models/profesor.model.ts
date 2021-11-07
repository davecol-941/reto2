import {Entity, model, property, hasMany} from '@loopback/repository';
import {Estudiante} from './estudiante.model';

@model()
export class Profesor extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ID__Profesor?: string;

  @property({
    type: 'string',
    required: true,
  })
  Materia: string;

  @hasMany(() => Estudiante)
  estudiantes: Estudiante[];

  constructor(data?: Partial<Profesor>) {
    super(data);
  }
}

export interface ProfesorRelations {
  // describe navigational properties here
}

export type ProfesorWithRelations = Profesor & ProfesorRelations;
