import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { InsumosService } from '../../../../services/insumos.service';
import { Observable } from 'rxjs/Observable';
import { Insumos } from '../../../../models/insumos.model';
import { TextMaskModule } from 'angular2-text-mask'
import { OrcamentoItem } from '../../../../models/orcamento.model';

@Component({
  selector: 'app-item-incluir',
  templateUrl: './item-incluir.component.html',
  
})
export class ItemIncluirComponent implements OnInit {

  @Input() ItemNovo : OrcamentoItem

  @Output() onCanceled = new EventEmitter
  @Output() onConfirmed = new EventEmitter

  insumos : Observable<Insumos[]>

  ngOnInit(): void {
    this.insumos = this.insumosService.getListaCompleta()
  }

  constructor(private insumosService : InsumosService) { 
  }

  onChange(item) {
    this.ItemNovo.itemizacao = "02.02"
    this.ItemNovo.nivel = 2
    this.ItemNovo.sequencia = 7
    this.ItemNovo.descricao = item.descricao
    this.ItemNovo.unidade = item.unidade
    this.ItemNovo.cst_unit_mo = item.cst_mo
    this.ItemNovo.cst_unit_outros = item.cst_outros
    this.ItemNovo.cst_unit = item.cst_total
    this.ItemNovo.tipo = item.tipos_id
  }

  confirmar() {
    this.onConfirmed.emit(this.ItemNovo)
  }

  cancelar() {
    this.onCanceled.emit()
  }

}
