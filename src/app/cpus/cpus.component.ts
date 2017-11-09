import { Component, OnInit } from '@angular/core';
import { CpusService } from '../services/cpus.service';
import { Cpus } from '../models/cpus.model';

@Component({
  selector: 'app-cpus',
  templateUrl: './cpus.component.html'
})
export class CpusComponent implements OnInit {

  constructor(private cpuService : CpusService) { }

  listaCpus : Cpus[]

  ngOnInit() {
    this.cpuService.getLista().subscribe(cpu => this.listaCpus = cpu)
  }

  

}
