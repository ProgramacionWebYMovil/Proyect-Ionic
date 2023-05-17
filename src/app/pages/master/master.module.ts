import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPageRoutingModule } from './master-routing.module';

import { MasterPage } from './master.page';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CardModule } from 'src/app/components/card/card.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPageRoutingModule,
    MatPaginatorModule,
    CardModule
  ],
  declarations: [
    MasterPage,
  ]
})
export class MasterPageModule {}
