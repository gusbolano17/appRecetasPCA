import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credentials:any) {
    return new Promise((resolve, reject) => {
      if(credentials.email == 'admin@mail.com' && credentials.password == '123456') {
        resolve("Login correcto")
      }else{
        reject("Credenciales incorrectas")
      }
    })
  }
}
