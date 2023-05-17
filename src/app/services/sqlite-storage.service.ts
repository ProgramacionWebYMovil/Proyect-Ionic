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

  private db?:SQLiteObject;
  private TABLE = "favs"
  private isReady = new BehaviorSubject<boolean>(false);
  private memes = new BehaviorSubject<Meme[]>([]);
  private memesInFav:Meme[] = []


  constructor(
    private sqlite:SQLite,
    private platform:Platform,
    private http: HttpClient,
    private porter:SQLitePorter
  ){

    this.memes.subscribe((memes) => {
      this.memesInFav = memes;
    })
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
        await this.load();
        this.isReady.next(true);
      }).catch(err => console.log(err)
      )
    })
  }

  private async load(){
    const favs = await this.db!.executeSql(
      `SELECT * FROM ${this.TABLE};`,
      []
    )
    let newMemes:Meme[] = [];
    for (let index = 0; index < favs.rows.length; index++) {
      newMemes.push(favs.rows.item(index));
    }
    this.memes.next(newMemes);
    this.isReady.next(true);

  }

  async addToFav(meme:Meme){
    await this.db!.executeSql(
      `INSERT INTO ${this.TABLE} (id, title, url) VALUES (${meme.id}, '${meme.title}', '${meme.url}');`,
      []
    ).then(async (response) => {
      console.log(response);
      await this.load()
    })
    .catch((error) => {
      console.error('Error al ejecutar la consulta SQL:', error);
    });
  }

  async deleteFromFavs(id:number){
    await this.db!.executeSql(
      `DELETE FROM ${this.TABLE} WHERE id = ${id};`,
      []
    )
    .then(async (response) => {
      console.log(response);
      await this.load();
    })
    .catch((Err) => {console.log(Err);
    })

  }

  databaseIsReady():Observable<boolean>{
    return this.isReady.asObservable();
  }

  getFavs(){
    return this.memes.asObservable();
  }

  async checkIsFav(meme:Meme){
    for (const favMeme of this.memesInFav) {
      if(meme.id === favMeme.id) return true;
    }
    return false
  }

}
