import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Insumos } from '../models/insumos.model';
import { http_url } from '../app.api'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

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

  createInsumo(insumo : Insumos) {
    
  }

}
