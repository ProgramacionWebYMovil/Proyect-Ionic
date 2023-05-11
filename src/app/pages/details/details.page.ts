import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meme } from 'src/app/interfaces/meme';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Comment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id!:number;
  meme!:Meme;
  comments!:Comment[];

  constructor(
    private firestoreService:FirestoreService,
    private activatedRoute:ActivatedRoute
    ) { 

  }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadContent(); 
  }


  async loadContent(){
    this.meme = await this.firestoreService.getMemeById(this.id);
  }

}
