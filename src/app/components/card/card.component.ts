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

  constructor(private sqliteService:SqliteStorageService) { }

  ngOnInit() {}

  addToFav(){
    this.sqliteService.addToFav(this.meme);
  }

}
