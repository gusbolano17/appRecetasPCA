import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarUsuariosPage } from './buscar-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarUsuariosPageRoutingModule {}
