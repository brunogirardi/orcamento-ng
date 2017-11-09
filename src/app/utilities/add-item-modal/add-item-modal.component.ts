import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TiposService } from '../../services/tipos.service';
import { Tipos } from '../../models/tipos.model';
import { InsumosService } from '../../services/insumos.service';
import { Insumos } from '../../models/insumos.model';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html'
})
export class AddItemModalComponent implements OnInit {

  @Input() mostrarDialog : boolean = true
  @Input() modeCreate : boolean = true

  @Output() onNewItem = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  tipos : Tipos[]
  insumos : Insumos[]

  constructor(private tiposService : TiposService, private insumosService : InsumosService) { }

  ngOnInit() {
    this.tipos = this.tiposService.getLista()
    this.insumosService.getLista().subscribe(Insumo => this.insumos = Insumo)
  }

  CloseEvent() {
    this.onCancel.emit();
  }

  AddEvent() {
    this.onNewItem.emit();
  }

}
