import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { http_url } from '../app.api';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'
import { Cpus, Cpu_item, Cpus_post } from '../models/cpus.model';

@Injectable()
export class CpusService {

  listaCpus : Cpus[]
  
  constructor(private http: HttpClient) {
  }

  // #region consultas HTTP na API

  getLista() : Observable<Cpus[]> {
    // Endereço API: http://orcamento-api.dev/api/cpus
    return this.http.get<Cpus[]>(`${http_url}/cpus`)
  }
  
  getCpu(id : number) : Observable<Cpus> {
    return this.http.get<Cpus>(`${http_url}/cpus/${id}`)
  }

  insertCpu(item : Cpus_post) : Observable<Cpus> {
    // http://orcamento-api.dev/api/cpus/full
    return this.http.post<Cpus>(`${http_url}/cpus/full`, item)
  }

  updateCpu(id : number, item : Cpus_post) : Observable<Cpus> {
    // Endereço API: http://orcamento-api.dev/api/cpus/{id}/full
    return this.http.patch<Cpus>(`${http_url}/cpus/${id}/full`, item)
  }

  duplicateCpu(id : number) {
    // Endereço API: http://orcamento-api.dev/api/cpus/{id}/duplicate
    return this.http.get(`${http_url}/cpus/${id}/duplicate`)
  }

  deleteCpu(id : number) : Observable<string> {
    return this.http.delete<string>(`${http_url}/cpus/${id}`)
  }
  // #endregion

  // #region Helper functions
  // #endregion
}