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

  async finish(){
    await this.storage.set('viLaIntro', true);
    await this.router.navigateByUrl('/login');
  }

}
