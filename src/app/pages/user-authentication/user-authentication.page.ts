import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { error, log } from 'console';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.page.html',
  styleUrls: ['./user-authentication.page.scss'],
})
export class UserAuthenticationPage implements OnInit {

  readonly form = this.formBuilder.group({
    name:["",[Validators.required,Validators.minLength(5)]],
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required]],
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

}
