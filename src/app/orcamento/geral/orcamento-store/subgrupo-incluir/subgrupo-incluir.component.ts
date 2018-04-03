import { Component, OnInit, Input, sequence, EventEmitter, Output } from '@angular/core';
import { IOrcamentoSubitemPost, OrcamentoItem } from '../../../../models/orcamento.model';
import { OrcamentoItensService } from '../../../../services/orcamento-itens.service';

@Component({
  selector: 'app-subgrupo-incluir',
  templateUrl: './subgrupo-incluir.component.html'
})
export class SubgrupoIncluirComponent implements OnInit {

  @Input() visivel : boolean = false
  @Input() sequencia : number
  @Input() orcamento : number
  @Input() niveis : OrcamentoItem[]

  descricao : string = "TESTANDO ESSE NEGOCIO"
  nivel : number

  @Output() novoItem = new EventEmitter
  @Output() onCanceled = new EventEmitter

  constructor(private orcamentoItemService : OrcamentoItensService) { }

  ngOnInit() { }

  salvar() {

    let postItem : IOrcamentoSubitemPost = {
      descricao : this.descricao,
      sequencia : this.sequencia,
      nivel : this.nivel,
      itemizacao : ""
    }

    this.orcamentoItemService.inserirSubitem(this.orcamento, postItem).subscribe(item => {
      console.log(item)
      this.novoItem.emit(item);
    })
    
  }


  cancelar() {
    this.visivel = false
    this.onCanceled.emit()
  }

}
