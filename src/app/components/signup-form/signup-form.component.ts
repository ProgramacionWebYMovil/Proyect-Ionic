import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageImagesService } from 'src/app/services/storage-images.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent  implements OnInit {

  isAlertOpen:boolean = false
  alertMessage:string = "";

  private errorTexts = {
    FIELD_REQUIRED:"This field is required",
    PASSWORD_PATTERN:"A least 8-16 characters, 1 digit, 1 lowercase letter, and 1 uppercase letter.",
    PASSWORD_NOT_EQUAL:"Passwords are not equal",
    PATTERN_EMAIL:"This is not a valid email format.",
    ERROR_REPEAT_EMAIL:"This email is already in use",
    ERROR_IMAGE:"You must upload a profile picture"
    }

  errorTextsForInputs = {
    name:this.errorTexts.FIELD_REQUIRED,
    email:this.errorTexts.FIELD_REQUIRED,
    password : this.errorTexts.FIELD_REQUIRED,
    passwordRepeat: this.errorTexts.FIELD_REQUIRED
  }
  private defaultImage = "https://ionicframework.com/docs/img/demos/avatar.svg";
  private imgFile?:File;
  avatarImg:any=this.defaultImage
  private passwordPattern  =new RegExp("^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$")


  readonly form = this.formBuilder.nonNullable.group({
    name:["",[Validators.required]],
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.pattern(this.passwordPattern)]],
    passwordRepeat:["",[Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private authenticationSearvice:AuthenticationService,
    private uploadImageService:StorageImagesService,
    private router:Router
    ) { }



  ngOnInit() {
  }

  onSubmit(){


    if(this.avatarImg === this.defaultImage) {this.setOpen(true,this.errorTexts.ERROR_IMAGE);return}
    if(this.form.valid){
      const userData = this.form.value;
      this.authenticationSearvice.registerUserEmail(userData.name!,userData.email!,userData.password!)
      .then(async response => {
        if(response){
          await this.uploadImageService.onFileUpload(this.imgFile!)
          .then( async url => await this.authenticationSearvice.updatePhotoURL(url));
          this.router.navigate(['/master']);
        }else this.setOpen(true,this.errorTexts.ERROR_REPEAT_EMAIL)
      })
      .catch(error => console.log(error));
    }

  }

  change($event:any){
    switch($event.target.name){
      case 'password':
        const errorsPass = this.form.controls.password.errors;
        if(errorsPass){
          const error = Object.keys(errorsPass)[0];
          console.log(error);

          this.errorTextsForInputs.password =
          error === 'pattern'
          ? this.errorTexts.PASSWORD_PATTERN
          : this.errorTexts.FIELD_REQUIRED
        }
        this.checkIfThePasswordsAreTheSame();
        break;
      case 'email':
        const errorsEmail = this.form.controls.email.errors;
        if(errorsEmail){
          const error = Object.keys(errorsEmail)[0];
          console.log(error);

          this.errorTextsForInputs.email =
          error === 'email'
          ? this.errorTexts.PATTERN_EMAIL
          : this.errorTexts.FIELD_REQUIRED
        }
        break;
      case 'passwordRepeat':
        this.checkIfThePasswordsAreTheSame()

        break;
    }
  }

  private checkIfThePasswordsAreTheSame(){
    let value;
    if(this.form.controls.password.value != this.form.controls.passwordRepeat.value && !this.form.controls.password.valid)
    {
      this.errorTextsForInputs.passwordRepeat = this.errorTexts.PASSWORD_NOT_EQUAL;
      value = { notEqualPassword:true }
    }
    else {
      this.errorTextsForInputs.passwordRepeat = this.errorTexts.FIELD_REQUIRED;
      value =null;
    };
    this.form.controls.passwordRepeat
    .setErrors(value);
  }

  uploadImage(event: any) {
    this.imgFile = event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.avatarImg = reader.result;
    };
  }

  setOpen(value:boolean,message?:string){
    this.alertMessage = message ?? this.alertMessage;
    this.isAlertOpen = value;
  }
}
