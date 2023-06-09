import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HeaderComponent } from './components/header/header.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import {SQLitePorter} from '@awesome-cordova-plugins/sqlite-porter/ngx'
import { HttpClientModule } from '@angular/common/http';
import { SqliteStorageService } from './services/sqlite-storage.service';


@NgModule({
  declarations: [AppComponent,HeaderComponent],
  imports:
  [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, } , SQLite, SQLitePorter,SqliteStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
