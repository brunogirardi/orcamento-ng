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
  insumosFiltro : Insumos[]

  searchInput : string
  searchTipo : number

  constructor(private tiposService : TiposService, private insumosService : InsumosService) { }

  ngOnInit() {
    this.tipos = this.tiposService.getLista()
    this.insumos = this.insumosService.getListaComCpus()
    this.insumosFiltro = this.insumos
  }

  CloseEvent() {
    this.onCancel.emit();
  }

  addNewItem(i : number) {

    let newItem : Cpu_item = new Cpu_item(this.insumos[i].id, this.insumos[i].descricao, this.insumos[i].unidade,  this.insumos[i].tipos_id, this.insumos[i].tipo, this.insumos[i].cst_total, 3, 0, 0, this.insumos[i].cst_mo, this.insumos[i].cst_outros)
    this.onNewItem.emit(newItem);

  }

  filtrarLista() {

    this.insumosFiltro = []
    let temporario : Insumos[] = []

    // Filtrar por tipos
    this.insumos.forEach(value => {
      if ((this.searchTipo == 0) || (!this.searchTipo) || (Number(this.searchTipo) == value.tipos_id))  {
        temporario.push(value)
      } 
    })  

    if (this.searchInput) {
      temporario.forEach(value => {
          if (value.descricao.includes(this.searchInput.toUpperCase())) {
            this.insumosFiltro.push(value)
          }
      })
    } else {
      this.insumosFiltro = temporario
    }

  }

}
