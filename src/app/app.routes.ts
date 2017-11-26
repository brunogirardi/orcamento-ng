import { Routes } from '@angular/router'
import { InsumosComponent } from './insumos/insumos.component';
import { CpusComponent } from './cpus/cpus.component';
import { CpusPageEditComponent } from './cpus/cpus-page-edit/cpus-page-edit.component';

export const ROUTES : Routes = [
    { path: '', component: InsumosComponent },
    { path: 'cpus', component: CpusComponent },
    { path: 'cpus-edit/:id', component: CpusPageEditComponent },
    { path: 'cpus-create', component: CpusPageEditComponent }
] 