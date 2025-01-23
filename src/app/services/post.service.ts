import { Injectable } from '@angular/core';
import {SupabaseService} from "./supabase.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private supabaseS : SupabaseService) { }

  async listarRecetas(){
    return this.supabaseS.client.from('recetas').select('*');
  }

  async listarIngredientesIdReceta(id: number){
    return this.supabaseS.client.from('ingredientes').select('*').eq('id_receta', id);
  }

  async obtenerUsuario(id : number){
    return this.supabaseS.client.from('profiles').select('*').eq('id_usuario', id).single();
  }
}
