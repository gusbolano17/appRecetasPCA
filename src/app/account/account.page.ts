import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {Storage} from "@ionic/storage-angular";
import {MenuController, ModalController, NavController} from "@ionic/angular";
import { Camera, CameraResultType } from '@capacitor/camera';
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import {PostService} from "../services/post.service";
import {EditProfilePage} from "../edit-profile/edit-profile.page";
defineCustomElements(window)

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {

  editing : boolean = false;

  public usuario : any = {
    name: '',
    last_name:'',
    email: '',
    image: '',
    followed_users: [],
    following_users: []
  };
  posts: any[] = [];

  constructor(private profileService: ProfileService,
              private menuCtrl: MenuController,
              private storage : Storage,
              private navCtrl : NavController,
              private postService: PostService,
              private modalController : ModalController
  ) {
  }

  async ngOnInit() {
    await this.menuCtrl.close();
    await this.obtenerUsuario();
    this.listarPostsUsuario();
  }

  regresar(){
    this.navCtrl.navigateBack('menu/home');
  }

  async listarPostsUsuario(){
    let usuario = await this.storage.get('userId');
    this.postService.listarTodosPosts().then((resp:any) => {
      this.posts = resp.filter((p:any) => p.user_id == usuario.user.id);
    })
  }

  async obtenerUsuario(){
    let usuario = await this.storage.get('userId');
    this.profileService.getUser(usuario.user.id).then(data => {
      this.storage.set('user', data);
      this.usuario = data;
    }).catch(error => {
      console.error(error);
    })
  }

  async editarUsuarioModal(){
    let usuario = await this.storage.get('userId');
    const modal = await this.modalController.create({
      component: EditProfilePage,
      componentProps: {usuario}
    })
    return modal.present();
  }

}
