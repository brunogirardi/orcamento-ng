import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Insumos, InsumosPost } from '../models/insumos.model';
import { http_url } from '../app.api'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class InsumosService {

  constructor(private http: HttpClient) { 
  }
  
  getListaCompleta() : Observable<Insumos[]> {
    return this.http.get<Insumos[]>(`${http_url}/insumos/completa`)
  }

  getLista() : Observable<Insumos[]> {
    return this.http.get<Insumos[]>(`${http_url}/insumos`)
  }

  getInsumo(id : number) : Observable<Insumos> {
    return this.http.get<Insumos>(`${http_url}/insumos/${id}`)
  }

  inserirInsumo(insumo : InsumosPost) : Observable<Insumos> {
    return this.http.post<Insumos>(`${http_url}/insumos/`, insumo)
  }
  
  updateInsumo(id : number, insumo : InsumosPost) : Observable<Insumos> {
    return this.http.patch<Insumos>(`${http_url}/insumos/${id}`, insumo)
  }

  deleteInsumo(id : number) : Observable<string> {
    return this.http.delete<string>(`${http_url}/insumos/${id}`)
  }

}
