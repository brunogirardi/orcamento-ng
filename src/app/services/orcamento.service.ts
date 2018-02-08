import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { http_url } from '../app.api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { OrcamentoPost } from '../models/orcamento.model';

@Injectable()
export class OrcamentoService {

  listaOrcamentos : any[]
  
  constructor(private http: Http) {
  }

  // #region Serviços do Orçamento

  getLista() : any {
    return this.http.get(`${http_url}/orcamento`)
      .map(response => response.json().data)
  }

  getOrcamento(id : number) {
    return this.http.get(`${http_url}/orcamento/${id}`)
      .map(response => response.json().data)
  }

  insertOrcamento(item : OrcamentoPost) : any {
    return this.http.post(`${http_url}/orcamento`, item)
      .map(response => response.json().data)
  }

  updateOrcamento(id : number, item : OrcamentoPost) {
    return this.http.patch(`${http_url}/orcamento/${id}`, item)
      .map(response => response.json().data)
  }

  // #endregion


  // #region Serviços do BDI

  

  // #endregion

}