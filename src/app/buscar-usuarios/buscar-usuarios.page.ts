import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {Storage} from "@ionic/storage-angular";
import {MenuController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-buscar-usuarios',
  templateUrl: './buscar-usuarios.page.html',
  styleUrls: ['./buscar-usuarios.page.scss'],
  standalone: false
})
export class BuscarUsuariosPage implements OnInit {

  usuarios: any = [];
  pagina: number = 1;
  limite: number = 10;
  query: string = '';
  hasMoreUsers : boolean = true;

  constructor(
    private profileService: ProfileService,
    private storage: Storage,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.menuCtrl.close();
    this.cargarUsuarios();
  }

  async cargarUsuarios(event?: any) {
    let usuario = await this.storage.get('user');
    if(!usuario) {
      usuario = await this.storage.get('userId').then((p) => p.user);
    }

    const followingUsers = usuario.following_users || [];
    this.profileService.listarUsuarios(this.pagina,this.limite, this.query).then(
      (data : any) => {
        if(data.users.length > 0){
          const updateUsers = data.users.map((user: any) => ({
            ...user,
            is_following: followingUsers.some((followedUser: any) => followedUser.id == user.id),
          }));
          this.usuarios = data.users;
          this.pagina++;
        }else{
          this.hasMoreUsers = false;
        }

        if(event){
          event.target.complete();
        }

      }
    ).catch(error => {
      console.error(error);
      event.target.complete();
    })
  }

  buscarUsuarios(event?: any) {
    this.query = event.target.value || '';
    this.pagina = 1;
    this.usuarios = [];
    this.hasMoreUsers = true;
    this.cargarUsuarios()
  }

  regresar() {
    this.navCtrl.navigateBack("/menu/home");
  }

  follow(user_id: any){
    console.log('follow', user_id);
  }

  unfollow(user_id: any){
    console.log('unfollow', user_id);
  }

  toggleFollow(user: any){
    if (user.is_following){
      this.unfollow(user.id);
    }else{
      this.follow(user.id);
    }
  }
}
