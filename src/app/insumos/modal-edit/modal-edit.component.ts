import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Insumos } from '../../models/insumos.model'
import { TiposService } from '../../services/tipos.service';
import { Tipos } from '../../models/tipos.model';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html'
})
export class ModalEditComponent implements OnInit {

  @Input() mostrarDialog : boolean = false

  @Output() onNewItem = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  novoInsumo : Insumos = null
  tipos : Tipos[]
  
  constructor(private tiposService : TiposService) {
    this.tipos = this.tiposService.getLista()
  }

  ngOnInit() {
    this.novoInsumo = null
  }

  CloseEvent() {
    this.onCancel.emit(true)
  }

  NewItemEvent() {
    this.onNewItem.emit(this.novoInsumo)
    this.onCancel.emit(true)
  }

}