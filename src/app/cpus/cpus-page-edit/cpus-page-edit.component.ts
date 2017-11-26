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
  id : any = null
  cpus : Cpus = new Cpus(null, "", "", null, "", 0, [])
  alertas : boolean = false

  constructor(private cpuService : CpusService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.id =  this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.cpuService.getCpu(this.id).subscribe(cpu => { 
        this.cpus = cpu
      })
    } 
  }

  showModalAddItem() {
    this.modalAddItemStatus = true
  }

  hideModalAddItem() {
    this.modalAddItemStatus = false
  }

  addNewItem(event : Cpu_item) {
    this.cpus.adicionarItem(event)
    this.hideModalAddItem()
  }

  fecharAlerta() {
    this.alertas = false
  }

  mostrarAlerta() {
    this.alertas = true
  }

  deletarInsumo(index) {
    this.cpus.removerItem(index)
  }

  inserirCpu() {
    this.cpuService.insertCpu(this.cpus.gerarPost()).subscribe(data => {
      this.cpus = data
      this.mostrarAlerta()
    })
  }

  atualizarCpu() {
    this.cpuService.updateCpu(this.id, this.cpus.gerarPost()).subscribe(data => {
      this.cpus = data
      this.mostrarAlerta()
    })
  }

}
