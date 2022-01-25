import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userData: any; // Save logged in user data
  isLoggedIn = false;

  constructor(public firebaseAuth: AngularFireAuth, private route: Router, private cookieService: CookieService) { 
  }

  signIn(email:string, password:string) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
      res=>{
        this.isLoggedIn = true;
        const dateNow = new Date();
        dateNow.setDate(dateNow.getHours() + 30); //cookie expire after 30 day
        this.cookieService.set('user', email, dateNow);
        this.route.navigate(['']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email:string, password:string) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(
      res=>{
        this.isLoggedIn = true;
        const dateNow = new Date();
        dateNow.setDate(dateNow.getHours() + 30); //cookie expire after 30 day
        this.cookieService.set('user', email, dateNow);
        this.route.navigate(['']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  logout(){
    this.firebaseAuth.signOut().then(() => {
      this.cookieService.delete("user");
      this.cookieService.delete("admin");
      this.isLoggedIn = false;
      this.route.navigate(['login']);
    }).catch((error) =>{
      window.alert("Error")
    });
    
  }

  forgotPassword(email:string){
    this.firebaseAuth.sendPasswordResetEmail(email).then(
      res=>{
        window.alert("check your email please");
      }).catch((error) => {
        window.alert("Error (auth/missing-email)");
      });
  }

}
