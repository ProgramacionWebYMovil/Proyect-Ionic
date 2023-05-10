import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAuthenticationPage } from './user-authentication.page';

const routes: Routes = [
  {
    path: '',
    component: UserAuthenticationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAuthenticationPageRoutingModule {}
