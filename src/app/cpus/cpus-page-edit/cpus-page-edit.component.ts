import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpus-page-edit',
  templateUrl: './cpus-page-edit.component.html'
})
export class CpusPageEditComponent implements OnInit {

  modalAddItemStatus : boolean = false

  constructor() { }

  ngOnInit() {
  }

  showModalAddItem() {
    this.modalAddItemStatus = true
  }

  hideModalAddItem() {
    this.modalAddItemStatus = false
  }

  addNewItem(event) {
    this.hideModalAddItem()
  }

}
