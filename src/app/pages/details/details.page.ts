import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meme } from 'src/app/interfaces/meme';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Comment } from 'src/app/interfaces/comment';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit{

  id!:number;
  meme!:Meme;
  comments!:Comment[];
  uid!:string;
  displayName!:string;
  photoURL!:string;
  email!:string;

  commentControl = new FormControl('',Validators.required);


  constructor(
    private firestoreService:FirestoreService,
    private activatedRoute:ActivatedRoute,
    private authService:AuthenticationService
    ) {

  }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadContent();
    this.authService.getCurrentUid().subscribe(data => {
      this.uid = data;
      if(data !== undefined){
        this.displayName = this.authService.getCurrentName();
        this.photoURL = this.authService.getCurrentPhotoURL();
        this.email = this.authService.getCurrentEmail();
      }
    });
    
    
  }





  async loadContent(){
    this.meme = await this.firestoreService.getMemeById(this.id);
    this.comments = (await this.firestoreService.getMemeCommentsById(this.id)).reverse();
  }

  submit(option:boolean){

    if(option && this.uid!==undefined){
      
      const comment: Comment = {
        //Cambiar el owner
        owner:this.displayName,
        idComment:Date.now()+this.email,
        content:this.commentControl.value as string,
        idMeme:this.id,
        like:[],
        dislike:[],
        date:Date.now(),
        imageOwner:this.authService.getCurrentPhotoURL()
      };
      this.firestoreService.addComment(this.id,comment,comment.idComment).then(async done =>{
        if(done) this.comments = (await this.firestoreService.getMemeCommentsById(this.id)).reverse();
      });
    }
    this.commentControl.reset();
  }


}
