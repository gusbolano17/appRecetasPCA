import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false,
})
export class IntroPage {

  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  finish(){
    this.storage.set('viLaIntro', true);
    this.router.navigateByUrl('/home');
  }

}
