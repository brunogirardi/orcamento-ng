import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InsumosComponent } from './insumos/insumos.component';
import { InsumosService } from './services/insumos.service';
import { HttpModule } from '@angular/http';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { TiposService } from './services/tipos.service';
import { FiltrosInsumosComponent } from './insumos/filtros-insumos/filtros-insumos.component';
import { CpusComponent } from './cpus/cpus.component';
import { CpusService } from './services/cpus.service';
import { ModalEditCpusComponent } from './cpus/modal-edit-cpus/modal-edit-cpus.component';
import { ModalEditInsumosComponent } from './insumos/modal-edit-insumos/modal-edit-insumos.component';
import { CpusPageEditComponent } from './cpus/cpus-page-edit/cpus-page-edit.component';
import { AddItemModalComponent } from './utilities/add-item-modal/add-item-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    InsumosComponent,
    NavComponent,
    FooterComponent,
    HeaderComponent,
    ModalEditInsumosComponent,
    FiltrosInsumosComponent,
    CpusComponent,
    ModalEditCpusComponent,
    CpusPageEditComponent,
    AddItemModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [
    InsumosService,
    TiposService,
    CpusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
