import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Insumos, InsumosPost } from '../../models/insumos.model'
import { TiposService } from '../../services/tipos.service';
import { Tipos } from '../../models/tipos.model';
import { InsumosService } from '../../services/insumos.service';

@Component({
  selector: 'app-modal-edit-insumos',
  templateUrl: './modal-edit-insumos.component.html'
})
export class ModalEditInsumosComponent implements OnInit {

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
      this.insumoService.updateInsumo(this.novoInsumo.id, this.novoInsumo).subscribe(insumos => this.onUpdatedItem.emit(insumos))
    }
  }

}