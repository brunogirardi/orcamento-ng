import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { http_url } from '../app.api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Cpus } from '../models/cpus.model';

@Injectable()
export class CpusService {

  listaCpus : Cpus[]
  
  constructor(private http: Http) {
  }

  getLista() : Observable<Cpus[]> {
    return this.http.get(`${http_url}/cpus`)
      .map(response => response.json().data)
  }


}
