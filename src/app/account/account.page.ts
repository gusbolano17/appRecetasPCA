import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {Storage} from "@ionic/storage-angular";
import {AlertController, MenuController, ModalController, NavController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import {EditProfilePage} from "../edit-profile/edit-profile.page";
import {ToastService} from "../services/toast.service";
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
    followers: [],
    followees: []
  };
  posts: any[] = [];

  constructor(private profileService: ProfileService,
              private menuCtrl: MenuController,
              private storage : Storage,
              private navCtrl : NavController,
              private modalController : ModalController,
              private alertCtrl : AlertController,
              private toastService: ToastService,
  ) {
  }

  async ngOnInit() {
    await this.menuCtrl.close();
    await this.obtenerUsuario();
    this.profileService.profileUpdated.subscribe((us) => {
      this.usuario = us;
    })
  }

  regresar(){
    this.navCtrl.navigateBack('menu/home');
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
    let usuario = await this.storage.get('user');
    const modal = await this.modalController.create({
      component: EditProfilePage,
      componentProps: {usuario},
      canDismiss: true
    })
    return modal.present();
  }


  async tomarFoto(source : CameraSource){
    const imagen = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: source
    }).catch(error => {
      this.toastService.crearToast('top', "Has cancelado la operacion", 'danger');
    })

    this.usuario.image = imagen?.dataUrl;
    await this.editarUsuario();
  }

  async editarUsuario() {
    this.profileService.updateUser(this.usuario).then(data => {
      console.log(data);
    }).catch(error => {
      console.error(error);
    })
  }

  async tomarFotoOpciones(){
    const alert = await this.alertCtrl.create({
      header: 'Seleccione una opcion',
      message: 'De donde quieres obtener la imagen?',
      buttons: [
        {
          text: 'Camara',
          handler : () => {
            this.tomarFoto(CameraSource.Camera)
          }
        },
        {
          text: 'Galeria',
          handler : () => {
            this.tomarFoto(CameraSource.Photos)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    })

    return alert.present();
  }

}
