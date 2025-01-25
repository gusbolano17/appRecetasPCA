import { Injectable } from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {Usuario} from "../interface/Usuario";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private supabaseS : SupabaseService) { }

  obtenerUsuarioId(id : any): Promise<Usuario> {
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
}
