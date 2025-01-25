import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Component} from "@angular/core";
import {NavController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {Storage} from "@ionic/storage-angular";

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
    private storage: Storage
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


  loginUser(credentials: any){
    this.authService.login(credentials).then(res => {
      this.errorMessage = '';
      this.storage.set('isUserLoggedIn', true);
      this.storage.set('userId', res)
      this.navCtrl.navigateForward('/menu/home');
    }).catch(err => {
      console.log(err);
      this.errorMessage = err;
    });
  }

}
