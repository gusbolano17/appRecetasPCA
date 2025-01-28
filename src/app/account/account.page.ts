import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {Storage} from "@ionic/storage-angular";
import {MenuController, NavController} from "@ionic/angular";
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import {PostService} from "../services/post.service";
defineCustomElements(window)

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {

  public usuario : any = {
    name: '',
    last_name:'',
    email: '',
    image: '',
    followed_users: [],
    following_users: []
  };

  constructor(private profileService: ProfileService,
              private postS : PostService,
              private menuCtrl: MenuController,
              private storage : Storage,
              private navCtrl : NavController
  ) { }

  async ngOnInit() {
    await this.menuCtrl.close();
    let usuario = await this.storage.get('userId');
    this.profileService.getUser(usuario.user.id).then(data => {
      this.storage.set('user', data);
      this.usuario = data;
    }).catch(error => {
      console.error(error);
    })
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
    this.profileService.updateUser(this.usuario).then(data => {
      console.log(data);
    }).catch(error => {
      console.error(error);
    })
  }

}
