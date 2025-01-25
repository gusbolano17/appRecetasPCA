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

  async agregarReceta(receta: any) {
    return new Promise((resolve, reject) => {
      this.supabaseS.client.from('recetas').insert([receta]).select().single().then((resp) => {
        if (resp.data){
          resolve(resp.data)
        }else{
          reject(resp.error);
        }
      })
    })
  }

  async agregarIngredients(ingredientes: any) {
    return new Promise((resolve, reject) => {
      this.supabaseS.client.from('ingredientes').insert(ingredientes).then((resp) => {
        if (resp.data){
          resolve(resp)
        }else{
          reject(resp.error);
        }
      })
    })
  }
}
