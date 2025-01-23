import { Injectable } from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient = createClient(environment.supabaseURl, environment.supabaseAPIKey);

  get client(){
    return this.supabase;
  }
}
