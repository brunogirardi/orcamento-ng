import { Component, OnInit } from '@angular/core';

import { InsumosService } from '../services/insumos.service';
import { Insumos } from '../models/insumos.model';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {

  insumos : Insumos[]

  constructor(private insumosService : InsumosService) { }

  ngOnInit() {

    this.insumosService.getLista().subscribe(insumos => this.insumos = insumos)
    // this.insumosService.getInsumo(5).subscribe(insumos => this.insumos = insumos)

  }

}
