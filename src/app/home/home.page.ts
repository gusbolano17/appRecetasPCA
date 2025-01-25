import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {ModalController} from "@ionic/angular";
import {PostmodalPage} from "../postmodal/postmodal.page";
import {ProfileService} from "../services/profile.service";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public recetas : any;

  constructor(private postS : PostService, private modalController : ModalController) { }

  async ngOnInit() {
    this.postS.listarRecetas().then(res => {
      this.recetas = res;
    })
  }


  async abrirModal() {
    const modal = await this.modalController.create({
      component: PostmodalPage,
      componentProps: {}
    })
    return modal.present();
  }


}
