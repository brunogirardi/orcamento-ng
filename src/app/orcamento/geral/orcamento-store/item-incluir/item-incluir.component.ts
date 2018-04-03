import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { InsumosService } from '../../../../services/insumos.service';
import { Observable } from 'rxjs/Observable';
import { Insumos } from '../../../../models/insumos.model';
import { TextMaskModule } from 'angular2-text-mask'
import { OrcamentoItem, IOrcamentoItemPost } from '../../../../models/orcamento.model';
import { OrcamentoItensService } from '../../../../services/orcamento-itens.service';

@Component({
  selector: 'app-item-incluir',
  templateUrl: './item-incluir.component.html',
  
})
export class ItemIncluirComponent implements OnInit {

  @Input() visivel : boolean = false
  @Input() sequencia : number
  @Input() orcamento : number
  @Input() niveis : OrcamentoItem[]

  @Output() onCanceled = new EventEmitter
  @Output() onConfirmed = new EventEmitter

  item : OrcamentoItem = new OrcamentoItem()

  insumos : Observable<Insumos[]>

  ngOnInit(): void {
    this.insumos = this.insumosService.getListaCompleta()
  }

  constructor(
    private insumosService : InsumosService,
    private orcamentoItemService : OrcamentoItensService) { 
  }

  onChangeInsumo(item) {
    this.item.itemizacao = ""
    this.item.sequencia = this.sequencia
    this.item.descricao = item.descricao
    this.item.unidade = item.unidade
    this.item.cst_unit_mo = item.cst_mo
    this.item.cst_unit_outros = item.cst_outros
    this.item.cst_unit = item.cst_total
    this.item.tipos_id = item.tipos_id
    this.item.insumos_id = item.id
    this.item.bdi = 1
  }

  onChangeNivel(nivel) {
    this.item.nivel = nivel.nivel + 1
  }

  confirmar() {
    let postItem : IOrcamentoItemPost = {
      insumos_id : this.item.insumos_id,
      sequencia : this.sequencia,
      quantidade : this.item.quantidade,
      itemizacao : "",
      nivel : this.item.nivel,
      bdi_id : 1
    }

    this.orcamentoItemService.inserirItem(this.orcamento, postItem).subscribe(item => {
      this.onConfirmed.emit(item)
    })
  }

  cancelar() {
    this.visivel = false
    this.onCanceled.emit()
  }

}
