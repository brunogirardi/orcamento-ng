import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Insumos, InsumosPost } from '../../models/insumos.model'
import { TiposService } from '../../services/tipos.service';
import { Tipos } from '../../models/tipos.model';
import { InsumosService } from '../../services/insumos.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html'
})
export class ModalEditComponent implements OnInit {

  @Input() mostrarDialog : boolean = false
  @Input() modeCreate : boolean = true

  @Output() onNewItem = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  tipos : Tipos[]
  novoInsumo : Insumos

  constructor(private tiposService : TiposService, private insumoService : InsumosService) {
    this.tipos = this.tiposService.getLista()
  }

  ngOnInit() {
  }

  CloseEvent() {
    this.onCancel.emit(true)
  }

  NewItemEvent(insumo : InsumosPost) {
    this.insumoService.inserirInsumo(insumo).subscribe(insumos => this.onNewItem.emit(insumos))
    this.onCancel.emit(true)
  }

  editarInsumo(id : number) {
    
  }

}