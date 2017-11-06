import { Component, OnInit } from '@angular/core';

import { InsumosService } from '../services/insumos.service';
import { Insumos } from '../models/insumos.model';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html'
})
export class InsumosComponent implements OnInit {

  insumos : Insumos[]

  // Variaveis de apoio ao modal de edição
  dialog : boolean = false
  modeCreate : boolean = true
  updateInsumo : Insumos = null

  constructor(private insumosService : InsumosService) { }

  ngOnInit() {
    this.insumosService.getLista().subscribe(insumos => this.insumos = insumos)
  }

  createInsumo() {
    this.dialog = true
    this.modeCreate = true
    this.updateInsumo = null
  }

  cancelDialog() {
    this.dialog = false
  }

  insertInsumo($event) {
    this.insumos.push($event)
  }

  editarInsumo(index : number) {
    this.dialog = true
    this.modeCreate = false
    this.updateInsumo = this.insumos[index]
  }

}
