import { Component } from '@angular/core';
import {MenuController, NavController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage{

  constructor(private menuC : MenuController, private storage : Storage, private navCtrl : NavController) { }

  async closeMenu(){
    await this.menuC.close();
  }

  logOut(){
    this.storage.remove("user");
    this.storage.remove("userId");
    this.storage.set("isUserLoggedIn", false);
    this.navCtrl.navigateForward('/login');
    this.closeMenu();
  }
}
