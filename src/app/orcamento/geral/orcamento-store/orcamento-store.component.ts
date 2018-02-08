import { Component, OnInit } from '@angular/core';
import { orcamentoGeral, OrcamentoPost } from '../../../models/orcamento.model';
import { OrcamentoService } from '../../../services/orcamento.service';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-orcamento-store',
  templateUrl: './orcamento-store.component.html'
})
export class OrcamentoStoreComponent implements OnInit {

  orcamento : orcamentoGeral = new orcamentoGeral(null)

  id : any

  constructor(private orcamentoService : OrcamentoService, private route : ActivatedRoute) {
    
  }

  ngOnInit() {

    /** Verifica se é um procedimento de UPDATE */
    if (!isNullOrUndefined(this.route.snapshot.paramMap.get('id'))) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.orcamentoService.getOrcamento(this.id).subscribe(dados => { 
        this.orcamento = new orcamentoGeral(dados)
      })
    }
  }

  novoOrcamento(orcamento : orcamentoGeral) {
    this.orcamentoService.insertOrcamento(new OrcamentoPost(orcamento)).subscribe(data => {
      this.orcamento = new orcamentoGeral(data)
    })
  }

  atualizarOrcamento(orcamento : orcamentoGeral) {
    this.orcamentoService.updateOrcamento(orcamento.id, new OrcamentoPost(orcamento)).subscribe(data => {
      this.orcamento = new orcamentoGeral(data)
    })
  }

}
