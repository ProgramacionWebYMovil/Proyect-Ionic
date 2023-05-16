import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  uid:string = "";
  showUserOptions = false;
  photoURL :Subject<string> = this.authentication.getCurrentPhotoURLObservable();


  constructor(
    private authentication:AuthenticationService,
    private menu: MenuController
  ) {

  }


  closeMenu(){
    this.menu.close('menu');
  }

  ngOnInit(): void {
    this.menu.enable(true,'menu');
    this.authentication.getCurrentUid().subscribe(data => {
      this.uid = data;
    });
  }

  toggleUserOptions() {
    this.showUserOptions = !this.showUserOptions;
  }

  logOut(){
    this.authentication.logOut();
  }
}


/*
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  //isUserLoggedIn = false;

  constructor(
    //private modalController: ModalController,
    //private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.isUserLoggedIn = user !== null;
    });
  }

  toggleUserOptions() {
    const userSection = document.querySelector('.user-section') as HTMLElement;
    userSection.classList.toggle('active');
  }

  async openLoginModal() {
    const loginModal = await this.modalController.create({
      component: LoginComponent,
      cssClass: 'my-custom-modal-css',
    });
    return await loginModal.present();
  }

  async openSignupModal() {
    const signupModal = await this.modalController.create({
      component: SignupComponent,
      cssClass: 'my-custom-modal-css',
    });
    return await signupModal.present();
  }

  openFavorites() {
    console.log('Go to Favorites');
  }

  openProfile() {
    console.log('Go to Profile');
  }

  logout() {
    this.authService.logout();
  }
}*/
