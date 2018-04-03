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

  sequencia : number = 3
  niveis : OrcamentoItem[]

  // #region Modal Nivel

  /**
   * Proriedade responsável pela visibilidade da janela
   * 
   * @type {boolean}
   * @memberOf OrcamentoStoreComponent
   */
  nivel_store_visibility : boolean = false

  /**
   * Configura os dados para a janela e a torna visível
   * 
   * @param {number} seq 
   * 
   * @memberOf OrcamentoStoreComponent
   */
  novoNivel(seq: number) {
    this.sequencia = seq
    this.nivel_store_visibility = true
  }

  /**
   * Recebe o item inserido do formulário e adiciona a lista
   * 
   * @param {OrcamentoItem} item 
   * 
   * @memberOf OrcamentoStoreComponent
   */
  onNovoNivel(item : OrcamentoItem) {

    let novoItem: OrcamentoItem = new OrcamentoItem()

    novoItem.id = item[0].id
    novoItem.agrupador = item[0].agrupador
    novoItem.sequencia = item[0].sequencia
    novoItem.nivel = item[0].nivel
    novoItem.itemizacao = item[0].itemizacao
    novoItem.descricao = item[0].descricao
    novoItem.cst_total = 0

    this.items.adicionarNivel(novoItem, this.sequencia)
    this.nivel_store_visibility = false
  }

  /**
   * Oculta a janela em caso de cancelamento da ação
   * 
   * 
   * @memberOf OrcamentoStoreComponent
   */
  onFecharSubitemIncluir() {
    this.nivel_store_visibility = false
  }

  // #endregion Modal Nivel

  // #region Modal Item

  item_store_visibility : boolean = false

  novoItem(seq) {
    this.sequencia = seq
    this.niveis = this.items.listarNiveis(this.sequencia)
    this.item_store_visibility = true
  }

  onNovoItem(item) {

    let novoItem: OrcamentoItem = new OrcamentoItem()

    novoItem.id = item[0].id
    novoItem.agrupador = item[0].agrupador
    novoItem.sequencia = item[0].sequencia
    novoItem.nivel = item[0].nivel
    novoItem.itemizacao = item[0].itemizacao
    novoItem.descricao = item[0].descricao
    novoItem.unidade = item[0].unidade
    novoItem.cst_unit = item[0].cst_unit
    novoItem.cst_unit_mo = item[0].cst_unit_mo
    novoItem.cst_unit_outros = item[0].cst_unit_outros
    novoItem.insumos_id = item[0].insumos_id
    novoItem.bdi_id = item[0].orcamento_bdi_id
    novoItem.quantidade = item[0].quantidade
    novoItem.tipos_id = item[0].tipos_id
    novoItem.bdi = item[0].bdi

    this.items.adicionarItem(novoItem, this.sequencia)
    this.item_store_visibility = false
  }

  onFecharItemIncluir() {
    this.item_store_visibility = false
  }

  removerItem(item : OrcamentoItem) {
    this.orcamentoItemService.deletarItem(this.orcamento.id, item.id).subscribe(elem => {
      this.items.deletarItem(item)
    })
  }

  // #endregion Modal Item

  // #region Funcoes Colapço / Expandir

  recolherGrupo(item : OrcamentoItem) {
    this.items.recolherGrupo(item.sequencia)
  }

  expandirGrupo(item : OrcamentoItem) {
    this.items.expandirGrupo(item.sequencia)
  }

  // #endregion


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
    this.sequencia = this.items.lista.length + 1
    this.niveis = this.items.listarNiveis()
    this.item_store_visibility = true
  }

  adicionarNovoSubgrupo() {
    this.sequencia = 100000
    this.nivel_store_visibility = true
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

    item.agrupador = false
    this.items.calcularSubtotal()

  }

}
