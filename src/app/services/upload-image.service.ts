import { Injectable } from '@angular/core';
import { Storage,ref,uploadBytes, getDownloadURL, listAll, deleteObject } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {

  private IMAGE_STORAGE?:string;

  private subject:Subject<boolean> = new Subject<boolean>;
  private imagesSubject:Subject<string[]> = new Subject<string[]>;

  userImages:string[] = [];
  private currentOverlayImages = {
    image1Url:"",
    image2Url:""
  }


  constructor(
    private storage:Storage,
    private auth:AuthenticationService
  ) {}


/*
    this.auth.getUidWithPromise().then(response =>{
      this.IMAGE_STORAGE = `userImages/${response}/`;
      this.subject.next(true);
    })

    this.overlayFirestoreService
    .createSuscribe(
      this.customOverlayService.overlay.userID,
      this.customOverlayService.overlay.urlID
    )
    this.overlayFirestoreService.suscribeOverlay().subscribe(data => {
      this.currentOverlayImages.image1Url = data.image1Url;
      this.currentOverlayImages.image2Url = data.image2Url;
    })



  }

  async onFileUpload(file:File) {
    const imgRef = ref(this.storage,this.IMAGE_STORAGE + file.name);
    await uploadBytes(imgRef,file)
    .then(response => console.log(response))
    .catch(error => console.log(error));
    this.getStoragedImages();
  }

  getChargeSubject():Subject<boolean>{
    return this.subject;
  }

  getUsersImages():Subject<string[]>{
    return this.imagesSubject;
  }

  async getStoragedImages(): Promise<void>{
    const imgRef = ref(this.storage,this.IMAGE_STORAGE);

    const response = await listAll(imgRef);
    this.userImages.splice(0);
    for (let item of response.items) {
      const url = await getDownloadURL(item);
      this.userImages.push(url);
    }
    this.imagesSubject.next(this.userImages);

  }

  deleteImage(image:string){
    const imgRef = ref(this.storage,image);
    deleteObject(imgRef).then(()=>{
      const newCurrentOverlayImages = this.currentOverlayImages;
      for (const key in this.currentOverlayImages) {
        const value = this.currentOverlayImages[key as keyof(typeof this.currentOverlayImages)];
        if( value == image) newCurrentOverlayImages[key as keyof(typeof newCurrentOverlayImages)] = "";
      }
      this.overlayFirestoreService.writeOverlay({...newCurrentOverlayImages},this.customOverlayService.overlay.urlID);
      this.getStoragedImages();
    }).catch(error => console.log(error));

  }

  setImageToTeam(team:1|2,image:string){
    const a:{image1Url?:string,image2Url?:string} = {
      ['image'+team+'Url']: image
    }
    this.overlayFirestoreService.writeOverlay({...a},this.customOverlayService.overlay.urlID)
  }
*/
}
