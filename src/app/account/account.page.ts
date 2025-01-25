import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {Storage} from "@ionic/storage-angular";
import {NavController} from "@ionic/angular";
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from "@ionic/pwa-elements/loader";
defineCustomElements(window)

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {

  public usuario : any = {
    id: 0,
    nombre: '',
    apellido: '',
    username: '',
    id_usuario: '',
    img_perfil: '',
  };

  constructor(private profileService: ProfileService, private storage : Storage, private navCtrl : NavController) { }

  async ngOnInit() {
    let {id} = await this.storage.get('userId');
    this.profileService.obtenerUsuarioId(id).then(usuario => {
      this.storage.set('usuario', usuario);
      this.usuario = usuario;
      console.log(this.usuario);
    }).catch(error => {
      console.error(error);
    });
  }

  regresar(){
    this.navCtrl.navigateBack('menu/home');
  }

  async tomarFoto(){
    const imagen = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    })

    this.usuario.img_perfil = imagen?.dataUrl;
    await this.actualizarUsuario();
  }

  async actualizarUsuario() {
    this.profileService.actualizarUsuario(this.usuario).then(usuario => {
      console.log(usuario);
    }).catch(error => {
      console.error(error);
    })
  }

}
