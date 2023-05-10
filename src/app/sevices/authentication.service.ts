import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth:Auth) { }

  async registerUserEmail(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async () => {
        console.assert("El usuario " + this.auth.currentUser?.uid + " se ha registrado");
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
}
