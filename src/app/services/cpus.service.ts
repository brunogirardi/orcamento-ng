import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { http_url } from '../app.api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Cpus, Cpu_item, Cpus_post } from '../models/cpus.model';

@Injectable()
export class CpusService {

  listaCpus : Cpus[]
  
  constructor(private http: Http) {
  }

  // #region consultas HTTP na API

  getLista() : Observable<Cpus[]> {
    // Endereço API: http://orcamento-api.dev/api/cpus
    return this.http.get(`${http_url}/cpus`)
      .map(response => response.json().data)
  }

  getCpu(id : number) {
    // Endereço API: http://orcamento-api.dev/api/cpus/{id}
    return this.http.get(`${http_url}/cpus/${id}`)
      .map(response => this.createCpuInstance(response.json().data))
  }

  insertCpu(item : Cpus_post) {
    // http://orcamento-api.dev/api/cpus/full
    return this.http.post(`${http_url}/cpus/full`, item)
      .map(response => this.createCpuInstance(response.json().data))
  }

  updateCpu(id : number, item : Cpus_post) {
    // Endereço API: http://orcamento-api.dev/api/cpus/{id}/full
    return this.http.patch(`${http_url}/cpus/${id}/full`, item)
      .map(response => this.createCpuInstance(response.json().data))
  }
  // #endregion

  // #region Helper functions

  createCpuInstance(data : any) {

    // console.log(data)

    let cpu = new Cpus(
      data.id,
      data.descricao,
      data.unidade,
      data.tipos_id,
      data.tipo, 
      data.cst_total,
      
    )
    
    data.itens.forEach(elemento => {
      let novo = new Cpu_item(elemento.insumos_id, elemento.descricao, elemento.unidade, 
          elemento.tipos_id, elemento.tipo, elemento.cst_total, 0, elemento.quantidade, elemento.id,
          elemento.cst_mo, elemento.cst_outros)
      cpu.adicionarItem(novo)
    });

    return cpu
  }
  // #endregion
}