import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Storage} from "@ionic/storage-angular";
import {NavController} from "@ionic/angular";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public recetas : any;
  public usuario : any;

  constructor(private authService: AuthService,private navCtrl: NavController, private storage: Storage, private postS : PostService) { }

  ngOnInit() {
    this.postS.listarRecetas().then(res => {
      this.recetas = res.data;
      this.recetas.forEach((receta : any) => {
        this.postS.obtenerUsuario(receta.id_usuario).then(res =>{
          this.usuario = res.data;
        });
      })
    })
  }

  listarIngredientesIdReceta(id: number, receta: any) {
    this.postS.listarIngredientesIdReceta(id).then(res => {
      receta.ingredientes = res.data;
    });
  }

  logOut(){
    this.authService.logout().then(res => {
      this.storage.remove('isUserLoggedIn');
      this.navCtrl.navigateForward('/login');
    })
  }


}
