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
import { SelectModule } from 'ng2-select';
import { OrcamentoIndexComponent } from './orcamento/geral/orcamento-index/orcamento-index.component';
import { OrcamentoService } from './services/orcamento.service';
import { OrcamentoStoreComponent } from './orcamento/geral/orcamento-store/orcamento-store.component';
import { OrcamentoBdiGeralComponent } from './orcamento/bdi/orcamento-bdi-geral/orcamento-bdi-geral.component';
import {NgxPaginationModule} from 'ngx-pagination';

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
    OrcamentoIndexComponent,
    OrcamentoStoreComponent,
    OrcamentoBdiGeralComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    SelectModule,
    NgxPaginationModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [
    InsumosService,
    TiposService,
    CpusService,
    OrcamentoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
