import { Component, OnInit } from '@angular/core';
import { getDownloadURL } from '@angular/fire/storage';
import { Validators, FormBuilder,ValidatorFn,ValidationErrors, FormGroup } from '@angular/forms';
import { error, log } from 'console';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageImagesService } from 'src/app/services/storage-images.service';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.page.html',
  styleUrls: ['./user-authentication.page.scss'],
})
export class UserAuthenticationPage{

  isLogin = true;

  changeMode(){
    this.isLogin=!this.isLogin;
  }


}
