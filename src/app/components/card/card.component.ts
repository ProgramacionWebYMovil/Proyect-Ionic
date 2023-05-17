import { Component, Input, OnInit } from '@angular/core';
import { Meme } from 'src/app/interfaces/meme';
import { SqliteStorageService } from 'src/app/services/sqlite-storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() meme!:Meme;
  favorite:boolean = false;


  constructor(private sqliteService:SqliteStorageService) { }

  ngOnInit() {
    this.sqliteService.databaseIsReady().subscribe(isReady => {
      if(isReady) this.checkFav();
    })
  }

  async checkFav(){
    
    this.favorite = await this.sqliteService.checkIsFav(this.meme)
  }

  async toFav(meme:Meme){
    if(this.favorite) await this.sqliteService.deleteFromFavs(meme.id).then(() => {this.checkFav();});
    else await this.sqliteService.addToFav(meme).then(() => {this.checkFav();});

  }

}
