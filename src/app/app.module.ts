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
import { ModalEditComponent } from './insumos/modal-edit/modal-edit.component';
import { TiposService } from './services/tipos.service';

@NgModule({
  declarations: [
    AppComponent,
    InsumosComponent,
    NavComponent,
    FooterComponent,
    HeaderComponent,
    ModalEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [
    InsumosService,
    TiposService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
