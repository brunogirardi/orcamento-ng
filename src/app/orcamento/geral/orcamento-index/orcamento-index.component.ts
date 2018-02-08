import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from '../../../services/orcamento.service';
import { orcamentoGeral } from '../../../models/orcamento.model';


@Component({
  selector: 'app-orcamento-index',
  templateUrl: './orcamento-index.component.html'
})
export class OrcamentoIndexComponent implements OnInit {

  lista : orcamentoGeral[] = []

  constructor(private orcamentoService : OrcamentoService) { }

  ngOnInit() {
    this.orcamentoService.getLista().subscribe(orcamento => {
      orcamento.map(data => {
        this.lista.push(new orcamentoGeral(data))
      })
    })

    console.log(this.lista)
  }

}
