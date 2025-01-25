import { Injectable } from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {resolve} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private supabaseS : SupabaseService) { }

  async listarRecetas(){
    return new Promise((resolve, reject) => {
      this.supabaseS.client.from('recetas')
        .select(`
        nombre_receta,
        descripcion,
        imagen_ref,
        id_usuario(*),
        ingredientes(*)
      `).then((resp) => {
        if (resp.data){
          resolve(resp.data);
        }else{
          reject("No se encontraron registros");
        }
      })
    })
  }

  // async listarIngredientesIdReceta(id: number){
  //   return new Promise((resolve, reject) => {
  //     this.supabaseS.client.from('ingredientes').select('*').eq('id_receta', id).then((resp) => {
  //       if (resp.data){
  //         resolve(resp.data);
  //       }else{
  //         reject("No se encontraron registros");
  //       }
  //     })
  //   });
  // }

  // async obtenerUsuario(id : number){
  //   return this.supabaseS.client.from('profiles').select('*').eq('id_usuario', id).single();
  // }
}
