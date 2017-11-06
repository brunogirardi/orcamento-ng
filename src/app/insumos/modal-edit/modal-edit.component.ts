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
  @Input() novoInsumo : InsumosPost

  @Output() onNewItem = new EventEmitter()
  @Output() onUpdatedItem = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  tipos : Tipos[]

  constructor(private tiposService : TiposService, private insumoService : InsumosService) {
    this.tipos = this.tiposService.getLista()
  }

  ngOnInit() {
  }

  CloseEvent() {
    this.onCancel.emit(true)
  }

  SalvarInsumo() {
    if (this.modeCreate == true) {
      this.insumoService.inserirInsumo(this.novoInsumo).subscribe(insumos => this.onNewItem.emit(insumos))
    } else {
      this.insumoService.updateInsumo(45, this.novoInsumo).subscribe(insumos => this.onUpdatedItem.emit(insumos))
    }
  }

}