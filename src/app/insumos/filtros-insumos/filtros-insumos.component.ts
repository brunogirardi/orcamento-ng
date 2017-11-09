import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TiposService } from '../../services/tipos.service';
import { Tipos } from '../../models/tipos.model';

@Component({
  selector: 'app-filtros-insumos',
  templateUrl: './filtros-insumos.component.html'
})
export class FiltrosInsumosComponent implements OnInit {

  @Input() listaOriginal : any;

  @Output() listaFiltrada : any;

  tipos : Tipos[]
  
  filtrosNumber : TipoFiltros[] = [
    { id: 1, desc: "MAIOR QUE", campo1: true, campo2: false},
    { id: 2, desc: "MENOR QUE", campo1: true, campo2: false},
    { id: 3, desc: "MAIOR IGUAL QUE", campo1: true, campo2: false},
    { id: 4, desc: "MENOR IGUAL QUE", campo1: true, campo2: false},
    { id: 5, desc: "IGUAL QUE", campo1: true, campo2: false},
    { id: 6, desc: "DIFERENTE QUE", campo1: true, campo2: false},
    { id: 7, desc: "ENTRE", campo1: true, campo2: true},
  ]

  filtrosString : TipoFiltros[] = [
    { id: 5, desc: "IGUAL QUE", campo1: true, campo2: false},
    { id: 6, desc: "DIFERENTE QUE", campo1: true, campo2: false},
    { id: 1, desc: "COMEÇA COM", campo1: true, campo2: false},
    { id: 2, desc: "NÃO COMEÇA COM", campo1: true, campo2: false},
    { id: 3, desc: "TERMINA COM", campo1: true, campo2: false},
    { id: 4, desc: "CONTEM", campo1: true, campo2: false},
    { id: 7, desc: "NÃO CONTEM", campo1: true, campo2: false},
  ]

  constructor(private tiposService : TiposService) { 
    this.tipos = this.tiposService.getLista()
  }

  ngOnInit() {
  }



}

interface TipoFiltros {
  id : number,
  desc: string,
  campo1: boolean,
  campo2: boolean
}