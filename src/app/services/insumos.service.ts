import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Insumos, InsumosPost } from '../models/insumos.model';
import { http_url } from '../app.api'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class InsumosService {

  listaInsumos : Insumos[] = []
  listaInsumosComCpus : Insumos[] = []
  listaSelect2 : Insumos[] = []

  constructor(private http: Http) { 
    this.getListaCompleta().subscribe(res => {   
      this.updateLista(res)
    });
  }

  updateLista(itens) : void {
    itens.map(item => {
      // Create the object
      let novo_item = {
        id : item.id,
        descricao : item.descricao,
        unidade : item.unidade,
        tipo : item.tipo,
        tipos_id : item.tipos_id,
        cst_total : item.cst_total,
        cst_mo : item.cst_mo,
        cst_outros : item.cst_outros
      }
      // Add to the listaInsumos if the item is differente of CPU
      if (novo_item.tipos_id != 6) {
        this.listaInsumos.push(novo_item)
      }
      // Creates the listaInsumosComCpus with all the objects
      this.listaInsumosComCpus.push(novo_item)

      this.listaSelect2.push(novo_item)
    })
  }

  getListaInsumos() : Observable<Insumos[]> {
    return this.http.get(`${http_url}/insumos`)
      .map(response => response.json().data)
  }
  
  getListaCompleta() : Observable<Insumos[]> {
    let lista : Observable<Insumos[]>
    lista = this.http.get(`${http_url}/insumos/completa`)
            .map(response => response.json().data)
    return lista
  }

  getLista() : Insumos[] {
    return this.listaInsumos
  }

  getListaComCpus() : Insumos[] {
    return this.listaInsumosComCpus
  }

  getInsumo(id : number) : Observable<Insumos> {
    return this.http.get(`${http_url}/insumos/${id}`)
      .map(response => response.json().data)
  }

  inserirInsumo(insumo : InsumosPost) : Observable<Insumos> {
    return this.http.post(`${http_url}/insumos/`, insumo)
      .map(response => <Insumos>response.json().data)
  }
  
  updateInsumo(id : number, insumo : InsumosPost) : Observable<Insumos> {
    return this.http.patch(`${http_url}/insumos/${id}`, insumo)
      .map(response => <Insumos>response.json().data)
  }

  deleteInsumo(id : number) : Observable<string> {
    return this.http.delete(`${http_url}/insumos/${id}`)
      .map(response => <string>response.json().data)
  }

}
