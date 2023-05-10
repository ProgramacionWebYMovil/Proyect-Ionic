import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAuthenticationPageRoutingModule } from './user-authentication-routing.module';

import { UserAuthenticationPage } from './user-authentication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAuthenticationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserAuthenticationPage]
})
export class UserAuthenticationPageModule {}
