import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async crearToast(position: any, message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      position,
      duration: 1000,
      color
    })

    return toast.present();
  }
}
