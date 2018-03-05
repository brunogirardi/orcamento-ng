import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { http_url } from '../app.api';
import { Observable } from 'rxjs/Observable';
import { OrcamentoPost, orcamentoGeral } from '../models/orcamento.model';

@Injectable()
export class OrcamentoService {

  listaOrcamentos : any[]
  
  constructor(private http: HttpClient) {
  }

  // #region Serviços do Orçamento

  getLista() : Observable<orcamentoGeral[]> {
    return this.http.get<orcamentoGeral[]>(`${http_url}/orcamento`)
  }

  getOrcamento(id : number) : Observable<orcamentoGeral> {
    return this.http.get<orcamentoGeral>(`${http_url}/orcamento/${id}`)
  }

  insertOrcamento(item : OrcamentoPost) : Observable<orcamentoGeral> {
    return this.http.post<orcamentoGeral>(`${http_url}/orcamento`, item)
  }

  updateOrcamento(id : number, item : OrcamentoPost) : Observable<orcamentoGeral> {
    return this.http.patch<orcamentoGeral>(`${http_url}/orcamento/${id}`, item)
  }

  // #endregion


  // #region Serviços do BDI

  

  // #endregion

}