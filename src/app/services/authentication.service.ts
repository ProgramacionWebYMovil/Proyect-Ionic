import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { updateProfile } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private auth:Auth) { }

  async registerUserEmail(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async () => {
        console.assert("El usuario " + this.auth.currentUser?.uid + " se ha registrado");
        this.updateName(name);
        return Promise.resolve(true);
      })
      .catch((error) => {
        console.error(error, "El usuario no ha podido registrarse");
        return Promise.resolve(false);
      });
  }

  async logInEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        console.assert("El usuario " + this.auth.currentUser?.uid + " se ha logueado");
        return Promise.resolve(true);
      })
      .catch((error) => {
        console.error(error, "El usuario no ha podido iniciar sesión");
        return Promise.resolve(false);
      });
  }

  async logOut(){
    await signOut(this.auth).then(() =>{
      window.location.href = '/master';
    }).catch((error) =>{
      console.log(error);
    })
  }

  isLoggedInUser(): Observable<boolean>{
    return new Observable(subscriber => {
      onAuthStateChanged(this.auth, user => {
        subscriber.next(!!user);
      })
    })
  }

  getCurrentUid(): Observable<string>{
    return new Observable(subscriber => {
      onAuthStateChanged(this.auth, user => {
        subscriber.next(user?.uid)
      })
    })
  }

  getCurrentName(){
    return this.auth.currentUser?.displayName as string;
  }

  getCurrentEmail(){
    return this.auth.currentUser?.email as string;
  }

  getCurrentPhotoURL(){
    return this.auth.currentUser?.photoURL as string;
  }

  updateName(name:string){
    updateProfile(this.auth.currentUser!, {
      displayName:name
    });
  }

  updatePhotoURL(photoURL:string){
    updateProfile(this.auth.currentUser!,{
      photoURL:photoURL
    });
  }

}
