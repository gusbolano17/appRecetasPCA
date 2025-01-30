import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {Storage} from "@ionic/storage-angular";
import {MenuController, NavController} from "@ionic/angular";
import {ToastService} from "../services/toast.service";

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
  usuarioActual : any;

  constructor(
    private profileService: ProfileService,
    private storage: Storage,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.menuCtrl.close();
    this.cargarUsuarios();
  }

  async cargarUsuarios(event?: any) {
    this.usuarioActual = await this.storage.get('user');
    if(!this.usuarioActual) {
      this.usuarioActual = await this.storage.get('userId').then((p) => p.user);
    }

    const followingUsers = this.usuarioActual.following_users || [];
    this.profileService.listarUsuarios(this.pagina,this.limite, this.query).then(
      (data : any) => {
        if(data.users.length > 0){
          const updateUsers = data.users.map((user: any) => ({
            ...user,
            is_following: followingUsers.some((followedUser: any) => followedUser.id == user.id),
          }));
          this.usuarios = [...this.usuarios, ...updateUsers];
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

  follow(followee_id: any){
    const user_id = this.usuarioActual.id;
    this.profileService.seguirUsuario(user_id, followee_id).then(
      (data : any) => {
        this.toastService.crearToast('top', data, 'success');
        this.usuarios = this.usuarios.map((usuario: any) => {
          if(usuario.id == followee_id){
            return{
              ...usuario,
              is_following: true
            }
          }
          return usuario;
        })
      }
    ).catch(error => {
      console.error(error);
    })
  }

  unfollow(followee_id: any){
    const user_id = this.usuarioActual.id;
    this.profileService.dejarSeguirUsuario(user_id, followee_id).then(
      (data : any) => {
        this.toastService.crearToast('top', data, 'success');
        this.usuarios = this.usuarios.map((usuario: any) => {
          if(usuario.id == followee_id){
            return{
              ...usuario,
              is_following: false
            }
          }
          return usuario;
        })
      }
    ).catch(error => {
      console.error(error);
    })
  }

  toggleFollow(user: any){
    if (user.is_following){
      this.unfollow(user.id);
    }else{
      this.follow(user.id);
    }
  }

}
