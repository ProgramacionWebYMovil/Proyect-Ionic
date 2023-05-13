import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageImagesService } from 'src/app/services/storage-images.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  readonly img = this.storageImagesService.getWhoAreYouImage();

  isAlertOpen:boolean = false;

  readonly form = this.formBuilder.nonNullable.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required]]
  })

  constructor(
    private formBuilder:FormBuilder,
    private storageImagesService:StorageImagesService,
    private authenticationService:AuthenticationService,
    private router:Router
  ) { }

  ngOnInit() {}

  onSubmit(){
    if(this.form.valid){
      this.authenticationService.logInEmail(this.form.controls.email.value,this.form.controls.password.value)
      .then(response => {
        if(response){
          this.router.navigate(['/master']);
        }else this.setOpen(true);
      }
      ).catch(err => console.log(err)
      )
    }
  }

  setOpen(state:boolean){
    this.isAlertOpen = state;
  }
}
