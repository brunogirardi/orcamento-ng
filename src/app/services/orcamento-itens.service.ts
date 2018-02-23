import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { http_url } from '../app.api';
import { OrcamentoItem } from '../models/orcamento.model';

@Injectable()
export class OrcamentoItensService {

  constructor(private http: Http) { }

  getLista(id : number) : any {
    return this.http.get(`${http_url}/orcamento/${id}/item`)
      .map(response => response.json().data)
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
  

  // #region

}
