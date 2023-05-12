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
    this.uid = this.authService.getCurrentUid();
    this.displayName = this.authService.getCurrentName();
  }





  async loadContent(){
    this.meme = await this.firestoreService.getMemeById(this.id);
    this.comments = await this.firestoreService.getMemeCommentsById(this.id);
  }

  submit(option:boolean){
    
    if(option && this.uid!==undefined){
      const comment: Comment = {
        //Cambiar el owner
        owner:this.displayName,
        uidComment:this.authService.getCurrentEmail()+Date.now(),
        content:this.commentControl.value as string,
        like:0,
        unlike:0,
        date:Date.now()
      };
      this.firestoreService.addComment(this.id,comment,comment.uidComment).then(async done =>{
        if(done) this.comments = await this.firestoreService.getMemeCommentsById(this.id);
      });
    }
    this.commentControl.reset();  
  }


}