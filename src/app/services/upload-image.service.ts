import { Injectable } from '@angular/core';
import { Storage,ref,uploadBytes, getDownloadURL, listAll, deleteObject } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  private IMAGE_STORAGE?:string;


  constructor(
    private storage:Storage,
    private auth:AuthenticationService
  ) {
    this.auth.getCurrentUid().subscribe(data => this.IMAGE_STORAGE = `userImages/${data}/`);
  }

  async onFileUpload(file:File): Promise<string> {
    const imgRef = ref(this.storage,this.IMAGE_STORAGE + file.name);
    await uploadBytes(imgRef,file)
    .then(response => console.log(response))
    .catch(error => console.log(error));
    return getDownloadURL(imgRef);
  }




}
