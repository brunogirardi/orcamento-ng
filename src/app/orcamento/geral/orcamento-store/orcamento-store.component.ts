import { Component, OnInit } from '@angular/core';
import { orcamentoGeral, OrcamentoPost, OrcamentoItem, OrcamentoItemLista } from '../../../models/orcamento.model';
import { OrcamentoService } from '../../../services/orcamento.service';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { OrcamentoItensService } from '../../../services/orcamento-itens.service';

@Component({
  selector: 'app-orcamento-store',
  templateUrl: './orcamento-store.component.html'
})
export class OrcamentoStoreComponent implements OnInit {

  orcamento : orcamentoGeral = new orcamentoGeral(null)
  items : OrcamentoItemLista = new OrcamentoItemLista([])

  id : any

  constructor(private orcamentoService : OrcamentoService, private route : ActivatedRoute, private itemsService : OrcamentoItensService) {
    
  }

  ngOnInit() {

    /** Verifica se é um procedimento de UPDATE */
    if (!isNullOrUndefined(this.route.snapshot.paramMap.get('id'))) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.orcamentoService.getOrcamento(this.id).subscribe(dados => { 
        this.orcamento = new orcamentoGeral(dados)
      })
      this.itemsService.getLista(this.id).subscribe(dados => {
        this.items = new OrcamentoItemLista(dados)
      });
    }
  }

  novoOrcamento(orcamento : orcamentoGeral) {
    this.orcamentoService.insertOrcamento(new OrcamentoPost(orcamento)).subscribe(data => {
      this.orcamento = new orcamentoGeral(data)
    })
  }

  atualizarOrcamento(orcamento : orcamentoGeral) {
    this.orcamentoService.updateOrcamento(orcamento.id, new OrcamentoPost(orcamento)).subscribe(data => {
      this.orcamento = new orcamentoGeral(data)
    })
  }

  adicionarNovoItem() {
    let item : OrcamentoItem = new OrcamentoItem()
    item.edicao_mode = true
    this.items.lista.push(item)
  }

  confirmarNovoItem(item : OrcamentoItem) {
    item.edicao_mode = false
    item.agrupador = false
    this.items.calcularSubtotalInicial()
  }

  cancelarNovoItem(item: OrcamentoItem) {
    this.items.removerItemEmEdicaoMode()
  }

}
