import { Component, OnInit } from '@angular/core';

import { InsumosService } from '../services/insumos.service';
import { Insumos, InsumosPost } from '../models/insumos.model';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html'
})
export class InsumosComponent implements OnInit {

  insumos : Insumos[]
  insumosFiltered : Insumos[]
  updateItemIndex: number = null

  // Variaveis de apoio ao modal de edição
  dialog : boolean = false
  modeCreate : boolean = true
  updateInsumo : InsumosPost = null

  constructor(private insumosService : InsumosService) { }

  ngOnInit() {
    this.insumos = this.insumosService.getLista()
  }

  createInsumo() {
    this.dialog = true
    this.modeCreate = true
    this.updateInsumo = { descricao : "", unidade: "", cst_total: 0, tipos_id:1, id: 0 }
  }

  cancelDialog() {
    this.dialog = false
    this.updateItemIndex = null
  }

  insertInsumo($event) {
    this.dialog = false
    this.insumos.push($event)
  }

  editarInsumo(index : number) {
    this.updateItemIndex = index
    this.updateInsumo = {
      id: this.insumos[index].id,
      descricao: this.insumos[index].descricao,
      unidade: this.insumos[index].unidade,
      tipos_id: this.insumos[index].tipos_id,
      cst_total: this.insumos[index].cst_total,
    }
    console.log()
    this.modeCreate = false
    this.dialog = true
  }

  deletarInsumo(index) {
    this.insumosService.deleteInsumo(this.insumos[index].id).subscribe()
    this.insumos.splice(index, 1)
  }

  updatedInsumo(evento) {
    this.insumos[this.updateItemIndex].descricao = evento.descricao
    this.insumos[this.updateItemIndex].unidade = evento.unidade
    this.insumos[this.updateItemIndex].tipos_id = evento.tipos_id
    this.insumos[this.updateItemIndex].tipo = evento.tipo
    this.insumos[this.updateItemIndex].cst_total = evento.cst_total
    this.dialog = false
    this.updateItemIndex = null
  }

  teste() {
    console.log('teste')
  }

}
