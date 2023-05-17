import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx';
import { Meme } from '../interfaces/meme';
import {HttpClient} from '@angular/common/http'
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqliteStorageService {

  private db!:SQLiteObject;
  private TABLE = "favs"
  private isReady = new BehaviorSubject<boolean>(false);
  private memes = new BehaviorSubject<Meme[]>([]);


  constructor(
    private sqlite:SQLite,
    private platform:Platform,
    private http: HttpClient,
    private porter:SQLitePorter
  ){

    this.platform.ready().then(()=>this.createDatabase());
  }

  private async createDatabase(): Promise<void>{

    await this.sqlite.create({
      name: 'data.db',
      location:'default'
    }).then(async (db:SQLiteObject) => {
      this.db = db;
      await this.createTable()
    })
  }

  private async createTable(): Promise<void>{
    this.http.get('assets/dbInit.sql',{responseType: 'text'}).subscribe(data => {
      this.porter.importSqlToDb(this.db,data).then(async () =>{
        this.load();
        this.isReady.next(true);
      })
    })
  }

  private async load(){
    const favs = await await this.db.executeSql(
      `SELECT * FROM ${this.TABLE};`,
      []
    )
    console.log(favs);
    if(favs.rows.length != 0){
      let newMemes:Meme[] = [];
      for (let index = 0; index < favs.rows.length; index++) {
        newMemes.push(favs.rows.item(index));
      }
      this.memes.next(newMemes);
    }
  }

  async addToFav(meme:Meme): Promise<void>{
    await this.db.executeSql(
      `INSERT INTO ${this.TABLE} (id, title, imageUrl) VALUES (${meme.id}, ${meme.title}, ${meme.url});`
    )
    this.load();
  }

  async deleteFromFavs(id:number){
    await this.db.executeSql(
      `DELETE FROM memes WHERE id = ${id};`,
      []
    )
    this.load();
  }

  databaseIsReady():Observable<boolean>{
    return this.isReady.asObservable();
  }

  getFavs(){
    return this.memes.asObservable();
  }


}
