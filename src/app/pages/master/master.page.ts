import { Component, OnInit } from '@angular/core';
import { Meme } from 'src/app/intefaces/meme';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {

  memes!:Meme[];

  constructor(private firestoreService:FirestoreService) { }

  ngOnInit() {
    this.loadContent();


  }

  async loadContent(){
    const memesPromise:Promise<Meme[]> = this.firestoreService.readMemes();
    this.memes = await memesPromise;
    console.log(this.memes);
  }

}
