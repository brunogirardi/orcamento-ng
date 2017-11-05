import { Injectable } from '@angular/core';
import { Tipos } from '../models/tipos.model';

@Injectable()
export class TiposService {

  tipos : Tipos[]
  
  constructor() {

    this.tipos = [
      {
        id: 1,
        descricao: 'MATERIAL'
      },
      {
        id: 2,
        descricao: 'MÃO DE OBRA'
      },
      {
        id: 3,
        descricao: 'EQUIPAMENTOS'
      },
      {
        id: 4,
        descricao: 'TERCERIZADOS'
      },
      {
        id: 5,
        descricao: 'VERBAS'
      },
      {
        id: 6,
        descricao: 'CPUS'
      },
    ]

   }

   getLista() : Tipos[] {
     return this.tipos
   }

}
