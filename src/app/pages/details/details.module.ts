import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import { DatePipe } from '@angular/common';
import { CommentComponent } from 'src/app/components/comment/comment.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [DetailsPage, CommentComponent],
  providers:[DatePipe]
})
export class DetailsPageModule {}
