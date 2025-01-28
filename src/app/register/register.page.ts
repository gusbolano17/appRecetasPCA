import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {NavController} from "@ionic/angular";
import {validadorCoincidenciaPass} from "../utils/validadores";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage{

  public formRegister: FormGroup;
  formErrors = {
    nombre: [{
      type: 'required',  message: 'El nombre es obligatorio',
    }],
    apellido: [{
      type: 'required',  message: 'El apellido es obligatorio',
    }],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe ser minimo de 6 caracteres' }
    ],
    confirmPassword: [{
      type: 'required', message: 'La contraseñas ingresadas no coinciden'
    }]
  }

  constructor(private fb : FormBuilder, private authService : AuthService, private navCtrl: NavController) {
    this.formRegister = this.fb.group({
      nombre : new FormControl('', Validators.required),
      apellido : new FormControl('', Validators.required),
      email : new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmPassword: new FormControl('', Validators.required)
    }, {
      validators : validadorCoincidenciaPass
    })
  }

  register(formValue: any) {
    this.authService.register(formValue).then(res => {
      this.navCtrl.navigateForward('/login');
    }).catch(err => {
      console.log(err);
    });
  }

  regresar() {
    this.navCtrl.navigateBack('/login');
  }
}
