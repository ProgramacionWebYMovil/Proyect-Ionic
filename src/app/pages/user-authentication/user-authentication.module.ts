import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAuthenticationPageRoutingModule } from './user-authentication-routing.module';

import { UserAuthenticationPage } from './user-authentication.page';
import { SignupFormComponent } from 'src/app/components/signup-form/signup-form.component';
import { LoginFormComponent } from 'src/app/components/login-form/login-form.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAuthenticationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations:[
    UserAuthenticationPage,
    SignupFormComponent,
    LoginFormComponent
  ]
})
export class UserAuthenticationPageModule {}
