import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Insumos, InsumosPost } from '../models/insumos.model';
import { http_url } from '../app.api'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class InsumosService {

  constructor(private http: Http) { }

  getLista() : Observable<Insumos[]> {
    return this.http.get(`${http_url}/insumos`)
      .map(response => response.json().data)
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
