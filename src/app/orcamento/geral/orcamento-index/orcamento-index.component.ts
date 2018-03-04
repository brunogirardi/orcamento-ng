import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from '../../../services/orcamento.service';
import { orcamentoGeral } from '../../../models/orcamento.model';


@Component({
  selector: 'app-orcamento-index',
  templateUrl: './orcamento-index.component.html'
})
export class OrcamentoIndexComponent implements OnInit {

  lista : any[] = []

  constructor(private orcamentoService : OrcamentoService) { }

  ngOnInit() {
    this.orcamentoService.getLista().subscribe(orcamento => {
      orcamento.map(data => {
        // console.log(data)
        this.lista.push(new orcamentoGeral(data))
      })
    })

  }

}
