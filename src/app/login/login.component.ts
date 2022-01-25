import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl,  FormBuilder, Validator, Validators} from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MemberService } from '../services/member.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  @ContentChild('template') template!: { elementRef: { nativeElement: TemplateRef<any>; }; };
  modalRef!: BsModalRef;
  childNode!: any;

  loginForm: FormGroup = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    stayConnected : new FormControl(false)
  });

  SignUpForm: FormGroup = new FormGroup({
    firstName : new FormControl('', [Validators.required]),
    lastName : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    cin : new FormControl('', [Validators.required, Validators.max(99999999)]),
    password : new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    type : new FormControl([Validators.required])
  });

  constructor(public firebaseService:FirebaseService,  public memberService:MemberService,private cookieService: CookieService, private route: Router, private modalService: BsModalService) {
   }

  ngOnInit(): void {
    if (this.cookieService.check('user') || this.cookieService.check('admin')){
      this.route.navigate(['']);
    }else{
      const childNode = this.template.elementRef.nativeElement;
    }
  }

  openMyDialog(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  async onSubmitLogin(){
    if(this.loginForm.value.email == "admin@admin.tn" && this.loginForm.value.password == "Admin@123"){
      const dateNow = new Date();
        dateNow.setDate(dateNow.getHours() + 30); //cookie expire after 30 day
        this.cookieService.set('admin', 'admin', dateNow);
        this.route.navigate(['']);
    }else{
      this.firebaseService.signIn(this.loginForm.value.email, this.loginForm.value.password)
    }

  }

  frgotPassword(){
    this.firebaseService.forgotPassword(this.loginForm.value.email)
  }

  onSubmitSignUp(){  
    console.log(this.SignUpForm.value.type)  
    if (this.SignUpForm.value.type == 1){ //ajouter enseignant
      this.memberService.addTeacher(this.SignUpForm.value.firstName, this.SignUpForm.value.lastName, String(this.SignUpForm.value.cin),this.SignUpForm.value.email, this.SignUpForm.value.password).subscribe(
        result=>{
          this.firebaseService.signUp(this.SignUpForm.value.email, this.SignUpForm.value.password)
        },
        error =>{
          console.log(error)
          window.alert("Email deja inscrit");
        }
      );
    }else{  //ajouter etudiant
      this.memberService.addStudent(this.SignUpForm.value.firstName, this.SignUpForm.value.lastName, String(this.SignUpForm.value.cin),this.SignUpForm.value.email, this.SignUpForm.value.password).subscribe(
        result=>{
          this.firebaseService.signUp(this.SignUpForm.value.email, this.SignUpForm.value.password)
        },
        error =>{
          console.log(error)
          window.alert("Email deja inscrit");
        }
      );
    }  
  }

  get theLoginForm(){
    return this.loginForm.controls;
  } 

  get theSignUpForm(){
    return this.SignUpForm.controls;
  }

}
