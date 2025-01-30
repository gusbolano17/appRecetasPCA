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

  posts : any[] = [];
  page : number = 1;
  limit : number = 10;
  hasMore : boolean = true;
  isLoading : boolean = false;

  constructor(private postS : PostService, private modalController : ModalController) { }

  async ngOnInit() {
    this.cargarPosts();
    this.postS.postEmited.subscribe(post => {
      this.posts.unshift(post);
    })
  }


  async abrirModal() {
    const modal = await this.modalController.create({
      component: PostmodalPage,
      componentProps: {}
    })
    return modal.present();
  }

  cargarPosts(event?:any){

    this.isLoading = true;

    this.postS.listarPosts(this.page, this.limit).then(
      (data: any)=>{
        if (data.length > 0){
          this.posts = [...this.posts, ...data];
          this.page++;
        }else{
          this.hasMore = false;
        }
        this.isLoading = false;
        if (event){
          event.target.complete();
        }
      },
      (error)=>{
        console.log(error);
        this.isLoading = false;
        if (event){
          event.target.complete();
        }
      }
    )
  }


}
