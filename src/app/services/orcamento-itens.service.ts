import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { http_url } from '../app.api';
import { OrcamentoItem } from '../models/orcamento.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OrcamentoItensService {

  constructor(private http: Http) { }

  getLista(id : number) : any {
    return this.http.get(`${http_url}/orcamento/${id}/item`)
      .map(response => this.prepararLista(response.json().data))
  }

  // getOrcamento(id : number) {
  //   return this.http.get(`${http_url}/orcamento/${id}`)
  //     .map(response => response.json().data)
  // }

  // insertOrcamento(item : OrcamentoItem) : any {
  //   return this.http.post(`${http_url}/orcamento`, item)
  //     .map(response => response.json().data)
  // }

  // updateOrcamento(id : number, item : OrcamentoItem) {
  //   return this.http.patch(`${http_url}/orcamento/${id}`, item)
  //     .map(response => response.json().data)
  // }

  // #region Helper Functions
  
  prepararLista(data : any) {

    let lista : OrcamentoItem[] = []
 
    data.map(item => {
      if (item.agrupador == 0) {
        lista.push(this.prepararItem(item))
      } else {
        lista.push(this.prepararGrupo(item))
      }
    })

    return lista

  }

  prepararItem(item : any) : OrcamentoItem {
    let novoItem : OrcamentoItem = new OrcamentoItem()

    novoItem.id = item.id,
    novoItem.agrupador = item.agrupador,
    novoItem.sequencia = item.sequencia,
    novoItem.nivel = item.nivel,
    novoItem.itemizacao = item.itemizacao,
    novoItem.descricao = item.descricao,
    novoItem.unidade = item.unidade,
    novoItem.quantidade = item.quantidade,
    novoItem.tipo = item.tipos_id,
    novoItem.cst_unit = item.cst_unit,
    novoItem.cst_unit_mo = item.cst_unit_mo,
    novoItem.cst_unit_outros = item.cst_unit_outros,
    novoItem.bdi_taxa = item.bdi,
    novoItem.bdi_id = item.bdi_id

    return novoItem
  }

  prepararGrupo(item : any) : OrcamentoItem {
    let novoItem : OrcamentoItem = new OrcamentoItem()

    novoItem.id = item.id,
    novoItem.agrupador = item.agrupador,
    novoItem.sequencia = item.sequencia,
    novoItem.nivel = item.nivel,
    novoItem.itemizacao = item.itemizacao,
    novoItem.descricao = item.descricao,
    novoItem.unidade = item.unidade,
    novoItem.quantidade = item.quantidade,
    novoItem.tipo = item.tipos_id,
    novoItem.cst_unit = item.cst_unit,
    novoItem.cst_unit_mo = item.cst_unit_mo,
    novoItem.cst_unit_outros = item.cst_unit_outros,
    novoItem.bdi_taxa = item.bdi,
    novoItem.bdi_id = item.bdi_id

    return novoItem
  }

  // #region

}
