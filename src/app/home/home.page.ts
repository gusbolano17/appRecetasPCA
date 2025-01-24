import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  public recetas : any;

  constructor(private postS : PostService) { }

  ngOnInit() {
    this.postS.listarRecetas().then(res => {
      this.recetas = res.data;
    })
  }


}
