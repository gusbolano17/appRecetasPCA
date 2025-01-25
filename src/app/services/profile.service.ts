import { Injectable } from '@angular/core';
import {SupabaseService} from "./supabase.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private supabaseS : SupabaseService) { }

  obtenerUsuarioId(id : any) {
    return new Promise((resolve, reject) => {
      this.supabaseS.client.from('profiles')
        .select('*')
        .eq('id_usuario', id).single().then(result => {
        if (result) {
          resolve(result.data);
        }else{
          reject('No se encontro el usuario');
        }
      })
    });
  }

  async actualizarUsuario(credenciales : any) {
    return new Promise((resolve, reject) => {
      this.supabaseS.client.from('profiles').update(credenciales).eq('id', credenciales.id).then(result => {
        if (result) {
          resolve(result);
        }else{
          reject('Surgio un error');
        }
      })
    }).catch(err => {
      console.error(err)
    })
  }
}
