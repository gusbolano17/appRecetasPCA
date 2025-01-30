import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"})};
  profileUpdated : EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  listarUsuarios(page: number, perPage: number, query: string = ''){
    const url = `${this.urlServer}/list_users?page=${page}&per_page=${perPage}&query=${query}`;
    return this.http.get(url).toPromise();
  }

  getUser(id: any){
    return new Promise((accept, reject) => {
      this.http.get(`${this.urlServer}/current_user/${id}`, this.httpHeaders).subscribe(
        (data: any)=>{
          accept(data);
        },
        (error) => {
          console.log(error, 'error');
          if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al obtener el usuario');
          }
        }
      )
    });
  }

  updateUser(user: any){
    const user_params = {
      user: user
    }
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/update/${user.id}`, user_params, this.httpHeaders).subscribe(
        (data: any)=>{
          accept(data);
          this.profileUpdated.emit(data);
        },
        (error) => {
          console.log(error, 'error');
          if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al actualizar el usuario');
          }
        }
      )
    });
  }

  seguirUsuario(id: any, followee_id: any){
    const follow_params = {
      followee_id
    }
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/follow/${id}`, follow_params, this.httpHeaders).subscribe(
        (data: any)=>{
          accept(data);
        },
        (error) => {
          if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al seguir al usuario');
          }
        }
      )
    })
  }

  dejarSeguirUsuario(id: any, followee_id: any){
    const unfollow_params = {
      followee_id
    }
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/unfollow/${id}`, unfollow_params, this.httpHeaders).subscribe(
        (data: any)=>{
          accept(data);
        },
        (error) => {
          if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al dejar de seguir al usuario');
          }
        }
      )
    })
  }
}
