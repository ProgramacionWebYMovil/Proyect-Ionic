import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meme } from 'src/app/interfaces/meme';
import { SqliteStorageService } from 'src/app/services/sqlite-storage.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.page.html',
  styleUrls: ['./favs.page.scss'],
})
export class FavsPage implements OnInit {

  constructor(private sqlite:SqliteStorageService) { }

  memes:Observable<Meme[]> = this.sqlite.getFavs();


  ngOnInit() {

  }



}
