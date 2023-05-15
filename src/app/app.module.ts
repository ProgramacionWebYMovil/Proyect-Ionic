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
import { ComponentsModule } from './components/components.module';


import { HeaderComponent } from './components/header/header.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


@NgModule({
  declarations: [AppComponent],
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
    ComponentsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, } , SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
