import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {Storage} from "@ionic/storage-angular";
import {Usuario} from "../interface/Usuario";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {

  public usuario: Usuario | undefined;

  constructor(private profileService: ProfileService, private storage : Storage, private navCtrl : NavController) { }

  async ngOnInit() {
    let {id} = await this.storage.get('userId');
    this.profileService.obtenerUsuarioId(id).then(usuario => {
      this.storage.set('usuario', usuario);
      this.usuario = usuario;
    }).catch(error => {
      console.error(error);
    });
  }

  regresar(){
    this.navCtrl.navigateBack('menu/home');
  }

}
