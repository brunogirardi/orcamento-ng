import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { http_url } from '../app.api';
import { IOrcamentoItem, IOrcamentoItemPost } from '../models/orcamento.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrcamentoItensService {

  constructor(private http: HttpClient) { }

  getLista(id : number) : Observable<IOrcamentoItem[]> {
    return this.http.get<IOrcamentoItem[]>(`${http_url}/orcamento/${id}/item`)
  }

  inserirItem(orcamento_id : number, item : IOrcamentoItemPost) : Observable<IOrcamentoItem> {
    return this.http.post<IOrcamentoItem>(`${http_url}/orcamento/${orcamento_id}/item`, item)
  }

}
