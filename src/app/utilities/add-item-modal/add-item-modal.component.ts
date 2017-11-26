import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TiposService } from '../../services/tipos.service';
import { Tipos } from '../../models/tipos.model';
import { InsumosService } from '../../services/insumos.service';
import { Insumos } from '../../models/insumos.model';
import { Cpu_item } from '../../models/cpus.model';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html'
})
export class AddItemModalComponent implements OnInit {

  @Input() mostrarDialog : boolean = false

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

  addNewItem(i : number) {

    let newItem : Cpu_item = new Cpu_item(this.insumos[i].id, this.insumos[i].descricao, this.insumos[i].unidade,  this.insumos[i].tipos_id, this.insumos[i].tipo, this.insumos[i].cst_total, 3, 0)
    this.onNewItem.emit(newItem);

  }

}
