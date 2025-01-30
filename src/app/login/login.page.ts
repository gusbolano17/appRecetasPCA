import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Component} from "@angular/core";
import {NavController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {Storage} from "@ionic/storage-angular";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage{

  loginForm: FormGroup;
  errorMessage: any;
  formErrors = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe ser minimo de 6 caracteres' }
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage,
    private toastService: ToastService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    })
  }


  async loginUser(credentials: any){
    this.authService.login(credentials).then((res:any) => {
      this.errorMessage = '';
      this.storage.set('isUserLoggedIn', true);
      this.storage.set('userId', res)
      this.navCtrl.navigateForward('/menu/home');
      this.toastService.crearToast('top', res.msg, res.status == 'OK' ? 'success' : 'danger');
    }).catch(err => {
      console.log(err);
      this.toastService.crearToast('top', err, 'danger');
      this.errorMessage = err;
    });
  }

}
