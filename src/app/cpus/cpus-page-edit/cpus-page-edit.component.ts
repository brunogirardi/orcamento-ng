import { Component, OnInit } from '@angular/core';
import { CpusService } from '../../services/cpus.service';
import { Cpus, Cpu_item } from '../../models/cpus.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cpus-page-edit',
  templateUrl: './cpus-page-edit.component.html'
})
export class CpusPageEditComponent implements OnInit {

  modalAddItemStatus : boolean = false
  id : any
  cpus : Cpus = {
    id : null,
    descricao: "",
    itens: [],
    unidade: "",
    cst_total: 0,
    tipos_id: 1,
    tipo: "MATERIAL"
  }

  constructor(private cpuService : CpusService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.id =  this.route.snapshot.paramMap.get('id');
    this.cpuService.getCpu(this.id).subscribe(cpus => this.cpus = cpus)
  }

  showModalAddItem() {
    this.modalAddItemStatus = true
  }

  hideModalAddItem() {
    this.modalAddItemStatus = false
  }

  addNewItem(event : Cpu_item) {
    this.cpus.itens.push(event)
    this.hideModalAddItem()
  }

}
