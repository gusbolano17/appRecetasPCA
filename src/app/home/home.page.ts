import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Storage} from "@ionic/storage-angular";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private authService: AuthService,private navCtrl: NavController, private storage: Storage) { }

  logOut(){
    this.authService.logout().then(res => {
      this.storage.remove('isUserLoggedIn');
      this.navCtrl.navigateForward('/login');
    })
  }

}
