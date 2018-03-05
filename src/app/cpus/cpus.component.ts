import { Component, OnInit } from '@angular/core';
import { CpusService } from '../services/cpus.service';
import { Cpu_lista, Cpus } from '../models/cpus.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cpus',
  templateUrl: './cpus.component.html'
})
export class CpusComponent implements OnInit {

  constructor(private cpuService : CpusService, private rotas : Router) { }

  listaCpus : Cpu_lista = new Cpu_lista()

  ngOnInit() {
    this.cpuService.getLista().subscribe(item => this.listaCpus.itens = item)
  }
  
  deletarCpu(index : number) {
    this.cpuService.deleteCpu(this.listaCpus.itens[index].id).subscribe();
    this.listaCpus.itens.splice(index, 1)
  }

  duplicateCpu(index: number) {
    // let cpu : Cpus
    // this.cpuService.duplicateCpu(this.listaCpus.itens[index].id).subscribe(data => {
    //cpu = data 
    //this.rotas.navigate(['/cpus-edit', cpu.id])
    // })
  }

}
