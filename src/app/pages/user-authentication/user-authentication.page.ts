import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder,ValidatorFn,ValidationErrors, FormGroup } from '@angular/forms';
import { error, log } from 'console';
import { AuthenticationService } from 'src/app/sevices/authentication.service';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.page.html',
  styleUrls: ['./user-authentication.page.scss'],
})
export class UserAuthenticationPage implements OnInit {

  private errorTexts = {
    FIELD_REQUIRED:"This field is required",
    PASSWORD_PATTERN:"A least 8-16 characters, 1 digit, 1 lowercase letter, and 1 uppercase letter.",
    PASSWORD_NOT_EQUAL:"Passwords are not equal",
    PATTERN_EMAIL:"This is not a valid email format."
    }

  errorTextsForInputs = {
    name:this.errorTexts.FIELD_REQUIRED,
    email:this.errorTexts.FIELD_REQUIRED,
    password : this.errorTexts.FIELD_REQUIRED,
    passwordRepeat: this.errorTexts.FIELD_REQUIRED
  }



  avatarImg="https://ionicframework.com/docs/img/demos/avatar.svg"
  private passwordPattern  =new RegExp("^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$")


  readonly form = this.formBuilder.nonNullable.group({
    name:["",[Validators.required]],
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.pattern(this.passwordPattern)]],
    passwordRepeat:["",[Validators.required]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private authenticationSearvice:AuthenticationService
    ) { }



  ngOnInit() {
  }

  onSubmit(){
    const userData = this.form.value;
    Object.values(userData).forEach(prop => {
      let property = prop as keyof(typeof userData);
      if(!userData[property]) userData[property] = "";
    })
    this.authenticationSearvice.registerUserEmail(userData.name!,userData.email!,userData.password!)
    .then(response => console.log(response))
    .catch(error => console.log(error));

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
}
