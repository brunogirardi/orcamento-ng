import { Component, OnInit, AfterContentInit  } from '@angular/core';
import { orcamentoGeral, OrcamentoPost, OrcamentoItem, OrcamentoItemLista, IOrcamentoItemPost } from '../../../models/orcamento.model';
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

  constructor(
    private orcamentoService : OrcamentoService, 
    private route : ActivatedRoute, 
    private itemsService : OrcamentoItensService,
    private orcamentoItemService : OrcamentoItensService) {

  }


  ngOnInit() {

    /** Verifica se é um procedimento de UPDATE */  
    if (!isNullOrUndefined(this.route.snapshot.paramMap.get('id'))) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.orcamentoService.getOrcamento(this.id).subscribe(dados => { 
        this.orcamento = dados
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
    this.items.adicionarItem(item)
  }

  confirmarNovoItem(item : OrcamentoItem) {
    
    // Adicionar item ao Banco de dados
    let ItemPost : IOrcamentoItemPost = {
      sequencia : item.sequencia,
      bdi_id : item.bdi_id,
      quantidade : item.quantidade,
      insumos_id : item.insumos_id,
      itemizacao : item.itemizacao,
      nivel : item.nivel
    }
    
    this.orcamentoItemService.inserirItem(this.id, ItemPost).subscribe(dado => item.id = dado.id)

    item.edicao_mode = false
    item.agrupador = false
    this.items.calcularSubtotal()

  }

  cancelarNovoItem(item: OrcamentoItem) {
    this.items.removerItemEmEdicaoMode()
  }

}
