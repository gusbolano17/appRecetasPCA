import {Component, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {defineCustomElements} from "@ionic/pwa-elements/loader";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PostService} from "../services/post.service";
import {Storage} from "@ionic/storage-angular";
import {ProfileService} from "../services/profile.service";
import {ModalController} from "@ionic/angular";
defineCustomElements(window)

@Component({
  selector: 'app-postmodal',
  templateUrl: './postmodal.page.html',
  styleUrls: ['./postmodal.page.scss'],
  standalone: false
})
export class PostmodalPage implements OnInit {

  postImg : any;
  postForm : FormGroup;

  constructor(private fb : FormBuilder, private postService: PostService, private profileService : ProfileService ,private storage : Storage, private modalController : ModalController) {
    this.postForm = this.fb.group({
      imagen_ref: new FormControl(""),
      nombre: new FormControl(""),
      descripcion: new FormControl(""),
      ingredientes: this.fb.array([])
    })
  }

  async ngOnInit() {
    const {id} = await this.storage.get('userId');
    this.profileService.obtenerUsuarioId(id).then(usuario => {
      this.storage.set('usuario', usuario);
    })
  }

  get ingredientes() : FormArray{
    return this.postForm.get('ingredientes') as FormArray;
  }

  async uploadImg() {
    const foto = await Camera.getPhoto({
      resultType : CameraResultType.DataUrl,
      quality : 100,
      source : CameraSource.Photos
    })

    this.postImg = foto.dataUrl;
    this.postForm.patchValue({ imagen_ref: this.postImg });
  }

  agregarIngrediente(){
    const nuevoIngrediente = this.fb.group({
      nombre: new FormControl(""),
      cantidades: new FormControl(""),
    });
    this.ingredientes.push(nuevoIngrediente);
  }

  quitarIngrediente(i : number){
    this.ingredientes.removeAt(i);
  }

  async agregarReceta(formData: any){

    const {id} = await this.storage.get('usuario');

    const receta = {
      nombre_receta: formData.nombre,
      descripcion: formData.descripcion,
      created_at: new Date(),
      imagen_ref: formData.imagen_ref,
      id_usuario: id,
    }

    const ingredientes = formData.ingredientes;

    this.postService.agregarReceta(receta).then((resp:any) => {
      if(resp){
        ingredientes.forEach((ing : any) => {
          this.postService.agregarIngredients({...ing, id_receta : resp.id, created_at : new Date()}).then(result => {
            this.modalController.dismiss();
          })
        })
      }
    }).catch(err => {
      console.error("error",err);
    });
  }

}
