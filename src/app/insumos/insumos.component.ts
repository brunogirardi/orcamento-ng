import { Component, OnInit } from '@angular/core';

import { InsumosService } from '../services/insumos.service';
import { Insumos } from '../models/insumos.model';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html'
})
export class InsumosComponent implements OnInit {

  insumos : Insumos[]
  dialog : boolean = false

  constructor(private insumosService : InsumosService) { }

  ngOnInit() {

    this.insumosService.getLista().subscribe(insumos => this.insumos = insumos)

  }

  mostrarDialog() {
    this.dialog = true
  }

  cancelDialog() {
    this.dialog = false
  }

  insertInsumo($event) {

  }

}
