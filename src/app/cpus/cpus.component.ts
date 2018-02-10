import { Component, OnInit } from '@angular/core';
import { CpusService } from '../services/cpus.service';
import { Cpu_lista } from '../models/cpus.model';

@Component({
  selector: 'app-cpus',
  templateUrl: './cpus.component.html'
})
export class CpusComponent implements OnInit {

  constructor(private cpuService : CpusService) { }

  listaCpus : Cpu_lista = new Cpu_lista()

  ngOnInit() {
    this.cpuService.getLista().subscribe(cpu => this.listaCpus.itens = cpu)
  }
  

}
