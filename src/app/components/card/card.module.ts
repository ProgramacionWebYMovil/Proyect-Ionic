import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [CardComponent]
})
export class CardModule { }
