import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Comment } from 'src/app/interfaces/comment';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent  implements OnInit {

  @Input() comment!:Comment;
  @Input() currentUser!: string;

  constructor(
    private firestoreService:FirestoreService,
    private alertController:AlertController
  ) { }

  ngOnInit() {}

  async like(){

    if(this.currentUser===undefined) {
      this.presentAlert();
      return;
    };

    if (this.comment.like.indexOf(this.currentUser)!==-1){
      await this.firestoreService.removelikeToMemeByID(this.comment.idMeme, this.comment.idComment, this.currentUser).then(async ret => {
        this.comment = await this.firestoreService.getMemeCommentByID(this.comment.idMeme,this.comment.idComment);
      });
    }else{
      /*Verifico que el usuario haya realizado un dislike, si lo ha realizado, lo borro y añado el like*/
      if(this.comment.dislike.indexOf(this.currentUser)!==-1){
        await this.firestoreService.removeDislikeToMemeByID(this.comment.idMeme, this.comment.idComment, this.currentUser).then(async ret => {
          this.comment = await this.firestoreService.getMemeCommentByID(this.comment.idMeme,this.comment.idComment);
        });
      }
      await this.firestoreService.addlikeToMemeByID(this.comment.idMeme, this.comment.idComment, this.currentUser).then(async ret => {
        this.comment = await this.firestoreService.getMemeCommentByID(this.comment.idMeme,this.comment.idComment);
      });
    }
  }

  async dislike(){

    if(this.currentUser===undefined) {
      this.presentAlert();
      return;
    };



    if (this.comment.dislike.indexOf(this.currentUser)!==-1){
      await this.firestoreService.removeDislikeToMemeByID(this.comment.idMeme, this.comment.idComment, this.currentUser).then(async ret => {
        this.comment = await this.firestoreService.getMemeCommentByID(this.comment.idMeme,this.comment.idComment);
      });
    }else{
      if(this.comment.like.indexOf(this.currentUser)!==-1){
        await this.firestoreService.removelikeToMemeByID(this.comment.idMeme, this.comment.idComment, this.currentUser).then(async ret => {
          this.comment = await this.firestoreService.getMemeCommentByID(this.comment.idMeme,this.comment.idComment);
        });
      }
      await this.firestoreService.addDislikeToMemeByID(this.comment.idMeme, this.comment.idComment, this.currentUser).then(async ret => {
        this.comment = await this.firestoreService.getMemeCommentByID(this.comment.idMeme,this.comment.idComment);
      });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Account Required',
      message: 'For giving a like you need to log in!',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
