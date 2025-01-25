import { Injectable } from '@angular/core';
import {SupabaseService} from "./supabase.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private supabaseS : SupabaseService) { }

  login(credentials:any) {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await this.supabaseS.client.auth.signInWithPassword(credentials);
      if (error) {
        return reject(error);
      }
      return resolve(data.user);
    })
  }

  async register(credentials: any) {
    const { data : user, error } = await this.supabaseS.client.auth.signUp({
      email : credentials.email,
      password: credentials.password,
    });

    if (error) {
      return { error: error.message };
    }

    const { error: profileError } = await this.supabaseS.client
      .from('profiles')
      .insert([
        {
          id_usuario: user.user?.id,
          nombre: credentials.nombre,
          apellido: credentials.apellido,
        },
      ]);

    if (profileError) {
      return { error: profileError.message };
    }

    return { data: user };
  }

  async logout() {
    const { error } = await this.supabaseS.client.auth.signOut();
    if (error) {
      return { error: error.message };
    }
    return { message: 'Cierre de sesión exitoso' };
  }
}
