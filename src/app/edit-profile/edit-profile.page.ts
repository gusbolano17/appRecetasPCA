import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {validadorCoincidenciaPass} from "../utils/validadores";
import {ProfileService} from "../services/profile.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {AlertController, ModalController, NavParams} from "@ionic/angular";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: false,
})
export class EditProfilePage implements OnInit {

  public usuarioE : any = {
    id: 0,
    name: '',
    last_name:'',
    image: '',
    password: ''
  };

  formEdit: FormGroup;

  formErrors = {
    nombre: [{
      type: 'required',  message: 'El nombre es obligatorio',
    }],
    apellido: [{
      type: 'required',  message: 'El apellido es obligatorio',
    }],
    username: [
      { type: 'required', message: 'El nombre de usuario es obligatorio' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe ser minimo de 6 caracteres' }
    ],
    confirmPassword: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' }
    ]
  }

  constructor(
    private fb : FormBuilder,
    private profileService: ProfileService,
    private modalCtrl : ModalController,
    private navParam: NavParams,
    private alertCtrl: AlertController,
    private toastService: ToastService,
  ) {
    this.formEdit = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      last_name: new FormControl('', Validators.compose([Validators.required])),
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required
      ]))
    }, {
      validators : validadorCoincidenciaPass
    })
  }

  ngOnInit(): void {
    const usuario = this.navParam.data["usuario"].user
    this.formEdit.patchValue({
      name: usuario.name,
      last_name: usuario.last_name,
      username: usuario.username
    })
    this.usuarioE.image = usuario.image;
    this.usuarioE.id = usuario.id;
  }

  async tomarFoto(source : CameraSource){
    const imagen = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source
    })

    this.usuarioE.image = imagen?.dataUrl;
  }

  async editarUsuario(formData : any) {
    this.usuarioE.name = formData.name;
    this.usuarioE.last_name = formData.last_name;
    this.usuarioE.username = formData.username;
    this.usuarioE.password = formData.password;

    this.profileService.updateUser(this.usuarioE).then((data:any) => {
      console.log(data);
      this.toastService.crearToast('top', data.msg, 'success');
      this.profileService.profileUpdated.emit(data);
      this.cerrarModal();
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


  async cerrarModal() {
    await this.modalCtrl.dismiss();
  }
}
