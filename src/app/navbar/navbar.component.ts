import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FirebaseService } from '../services/firebase.service';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isConnected = false;
  userId: any;
  Name!: string;
  admin!:string;
  isAdmin = false;
  imagePath!:any;

  constructor(private _sanitizer: DomSanitizer, public firebaseService:FirebaseService,  private cookieService: CookieService, private route: Router, private memberService:MemberService) { }

  ngOnInit(): void {
    if (this.cookieService.check('user')){
      this.isConnected = true;
      this.memberService.getMemberByEmail(this.cookieService.get('user')).subscribe(
        result=>{
          if(result.photo === null){
            this.imagePath = this._sanitizer.bypassSecurityTrustUrl("./assets/images/Avatar-11.png")
          }else{
            this.imagePath = this._sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + result.photo)
          }
          this.userId = result.id;
          this.Name = result.nom + " " + result.prenom;
        },
        error =>{
          console.log(error)
        })
    }else if(this.cookieService.check('admin')){
      this.admin = "Admin";
      this.isAdmin = true;
    }
  }

  logOut(){
    this.firebaseService.logout();
  }


}
