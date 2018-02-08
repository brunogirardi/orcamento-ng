import { Routes } from '@angular/router'
import { InsumosComponent } from './insumos/insumos.component';
import { CpusComponent } from './cpus/cpus.component';
import { CpusPageEditComponent } from './cpus/cpus-page-edit/cpus-page-edit.component';
import { OrcamentoIndexComponent } from './orcamento/geral/orcamento-index/orcamento-index.component';
import { OrcamentoStoreComponent } from './orcamento/geral/orcamento-store/orcamento-store.component';

export const ROUTES : Routes = [
    { path: '', component: InsumosComponent },

    // Routes ref. to CPU
    { path: 'cpus', component: CpusComponent },
    { path: 'cpus-edit/:id', component: CpusPageEditComponent },
    { path: 'cpus-create', component: CpusPageEditComponent },

    // Routes ref. to Orcamento
    { path: 'orcamento', component: OrcamentoIndexComponent },
    { path: 'orcamento/store', component: OrcamentoStoreComponent },
    { path: 'orcamento/update/:id', component: OrcamentoStoreComponent },
] 