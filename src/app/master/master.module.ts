import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasterPageRoutingModule } from './master-routing.module';

import { MasterPage } from './master.page';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CardComponent } from '../components/card/card.component';
import { PaginatorComponent } from '../components/paginator/paginator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasterPageRoutingModule,
    MatPaginatorModule
  ],
  declarations: [
    MasterPage,
    PaginatorComponent,
    CardComponent
  ]
})
export class MasterPageModule {}
