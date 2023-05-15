import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx';
import { Meme } from '../interfaces/meme';
import { table } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SqliteStorageService {

  private db!:SQLiteObject;
  private TABLE = "favs"


  constructor(
    private sqlite:SQLite,
    private platform:Platform
  ){
    this.createDatabase();
  }

  private async createDatabase(): Promise<void>{
    await this.sqlite.create({
      name: 'data.db',
      location:'default'
    }).then((db:SQLiteObject) => {
      this.db = db;
    })

    await this.createTable()
  }

  private async createTable(): Promise<void>{
    await this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.TABLE} (id INTEGER PRIMARY KEY, title TEXT,url TEXT);`,
      []
    )
  }

  async addToFav(meme:Meme): Promise<void>{
    await this.db.executeSql(
      `INSERT INTO ${this.TABLE} (id, title, url) VALUES (${meme.id}, ${meme.title}, ${meme.url});`
    )
  }

  async getFavs(){
    return await this.db.executeSql(
      `SELECT id, title, url FROM ${this.TABLE};`,
      []
    )
  }

  async getFromFavs(id:number): Promise<any>{
    return await this.db.executeSql(
      `SELECT id, title, url FROM ${this.TABLE} WHERE id = ${id};`,
      []
    )
  }

  async deleteFromFavs(id:number){
    await this.db.executeSql(
      `DELETE FROM memes WHERE id = ${id};`,
      []
    )

  }


}
