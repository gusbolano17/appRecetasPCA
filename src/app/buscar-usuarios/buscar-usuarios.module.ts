import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarUsuariosPageRoutingModule } from './buscar-usuarios-routing.module';

import { BuscarUsuariosPage } from './buscar-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarUsuariosPageRoutingModule
  ],
  declarations: [BuscarUsuariosPage]
})
export class BuscarUsuariosPageModule {}
