import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InsumosComponent } from './insumos/insumos.component';
import { InsumosService } from './services/insumos.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    InsumosComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    InsumosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
