import { Injectable } from '@angular/core';
import { Storage,ref,uploadBytes, getDownloadURL, listAll, deleteObject } from '@angular/fire/storage';
import { Observable, Subject, Subscriber } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class StorageImagesService {

  private IMAGE_STORAGE?:string;
  private IMAGE_WHOAREYOU:string ="images/WhoAreYou.jpg";


  constructor(
    private storage:Storage,
    private auth:AuthenticationService
  ) {
    this.auth.getCurrentUid().subscribe(data => this.IMAGE_STORAGE = `userImages/${data}/`);
  }

  photoURLObservable(): Observable<string>{
    return new Observable(suscriber => {
      
    });
  }

  async onFileUpload(file:File): Promise<string> {
    const imgRef = ref(this.storage,this.IMAGE_STORAGE + file.name);
    await uploadBytes(imgRef,file)
    .then(response => console.log(response))
    .catch(error => console.log(error));
    return getDownloadURL(imgRef);
  }

  getWhoAreYouImage(): Promise<string>{
    const imgRef = ref(this.storage,this.IMAGE_WHOAREYOU);
    return getDownloadURL(imgRef);
  }




}
