import { Component, Input, OnInit } from '@angular/core';
import { Meme } from 'src/app/interfaces/meme';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() meme!:Meme;
  favorite:boolean = false;

  constructor() { }

  ngOnInit() {}

  toFav(){
    console.log("Hola");
    this.favorite = !this.favorite;
  }

}
