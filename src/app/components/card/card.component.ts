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

  ngOnInit() {}

  toFav(){
    console.log("Hola");
    this.favorite = !this.favorite;
  }

}
