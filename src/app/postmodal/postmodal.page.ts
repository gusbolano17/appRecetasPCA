import {Component} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {defineCustomElements} from "@ionic/pwa-elements/loader";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../services/post.service";
import {Storage} from "@ionic/storage-angular";
import {ModalController} from "@ionic/angular";
import {ToastService} from "../services/toast.service";
defineCustomElements(window)

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.page.html',
  styleUrls: ['./postmodal.page.scss'],
  standalone: false
})
export class PostmodalPage {

  addPostForm: FormGroup;
  post_image: any;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private storage: Storage,
    private modalController: ModalController,
    private toastService: ToastService,
  ) {
    this.addPostForm = this.fb.group({
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  async subirFoto() {
    const foto = await Camera.getPhoto({
      quality: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl
    })
    this.post_image = foto.dataUrl;
    this.addPostForm.patchValue({
      image: this.post_image
    })
  }

  async agregarPost(data: any) {
    let usuario = await this.storage.get('user');
    if(!usuario) {
      usuario = await this.storage.get('userId').then((p) => p.user);
    }

    const post_param = {
      post: {
        description: data.description,
        image: data.image,
        user_id: usuario.id
      }
    }

    this.postService.createPost(post_param).then((data:any) => {
      data.user = {
        id: usuario.id,
        name: usuario.name,
        image: usuario.image,
      }
      this.postService.postEmited.emit(data);
      this.addPostForm.reset();
      this.post_image = null;
      this.toastService.crearToast('top', data.msg, 'success');
      this.cerrarModal();
    }).catch(error => {
      console.error('error', error)
    })

  }

  async cerrarModal() {
    await this.modalController.dismiss();
  }
}
