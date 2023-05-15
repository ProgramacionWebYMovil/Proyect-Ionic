import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SQLite} from "@awesome-cordova-plugins/sqlite/ngx"

import { FavsPage } from './favs.page';

const routes: Routes = [
  {
    path: '',
    component: FavsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [SQLite],
  exports: [RouterModule],
})
export class FavsPageRoutingModule {}
