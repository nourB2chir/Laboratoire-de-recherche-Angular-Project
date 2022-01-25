import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MemberService } from '../services/member.service';
import { PublicationsService } from '../services/publications.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent implements OnInit {

  thisId:string | undefined;
  connectedUser: any;
  currentUser : any;
  isStudent = true;
  files:any;
  selectedFile: File | undefined;
  imagePath:any;
  imageUrl:string | undefined;

  updateMemberForm: FormGroup = new FormGroup({});

  constructor(private _sanitizer: DomSanitizer ,private formBuilder:FormBuilder,private route: ActivatedRoute, private router:Router, private memberService:MemberService, private pubService:PublicationsService,private cookieService: CookieService) { }

  ngOnInit(): void {  
    this.route.queryParams.subscribe(
      params => {
        this.thisId = params.id; 
      });

      if(this.thisId != null){
        if (this.cookieService.check('user')){
          this.memberService.getMemberByEmail(this.cookieService.get('user')).subscribe(
            result=>{
              if( result.id !=  this.thisId){
                this.router.navigate([''], { relativeTo: this.route });
              }
            },error =>{
                console.log(error)
            })
            this.memberService.getFullMember(this.thisId).subscribe(
              result=>{
                if(result.photo === null){
                  this.imagePath = this._sanitizer.bypassSecurityTrustUrl("./assets/images/Avatar-11.png")
                }else{
                  this.imagePath = this._sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + result.photo)
                }
                console.log(result.photo);
                this.currentUser = result
                if(result.diplome !== undefined){
                  this.isStudent = true;
                }else{
                  this.isStudent = false;
                }
                this. updateMemberForm = this.formBuilder.group({
                  firstName : new FormControl(result.nom),
                  lastName : new FormControl(result.prenom),
                  email : new FormControl(result.email),
                  cin : new FormControl(result.cin),
                  dateNaissance : new FormControl(),
                  cv : new FormControl(result.cv),
                  grade : new FormControl(result.grade),
                  etablissement : new FormControl(result.etablissement),
                  diplome : new FormControl(result.diplome),
                  photo : new FormControl(result.photo)
                });
              },
              error =>{
                this.router.navigate([''], { relativeTo: this.route });
              })
        }else if(this.cookieService.check('admin')){
          console.log('admin')
          this.memberService.getFullMember(this.thisId).subscribe(
              result=>{
                console.log(result)
                if(result.photo === null){
                  this.imagePath = this._sanitizer.bypassSecurityTrustUrl("./assets/images/Avatar-11.png")
                }else{
                  this.imagePath = this._sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + result.photo)
                }
                this.currentUser = result;
              
                if(result.diplome !== undefined){
                  this.isStudent = true;
                }else{
                  this.isStudent = false;
                }
                this.updateMemberForm = this.formBuilder.group({
                  firstName : new FormControl(result.nom),
                  lastName : new FormControl(result.prenom),
                  email : new FormControl(result.email),
                  cin : new FormControl(result.cin),
                  dateNaissance : new FormControl(),
                  cv : new FormControl(result.cv),
                  grade : new FormControl(result.grade),
                  etablissement : new FormControl(result.etablissement),
                  diplome : new FormControl(result.diplome),
                  photo : new FormControl(result.photo)
                });
              },
              error =>{
                this.router.navigate([''], { relativeTo: this.route });
              })
        }else{
          this.router.navigate([''], { relativeTo: this.route });
        }       
      }else{
        this.router.navigate([''], { relativeTo: this.route });
      } 
  }

  get theaupdateMemberForm(){
    return this.updateMemberForm.controls;
  } 

  updateMember(){
    if(this.isStudent){
      if(this.updateMemberForm.value.dateNaissance === null || this.updateMemberForm.value.dateNaissance === undefined){
        this.memberService.UpdateStudent(this.thisId!, this.updateMemberForm.value.firstName, this.updateMemberForm.value.lastName, this.updateMemberForm.value.cin, this.updateMemberForm.value.email, this.currentUser.dateNaissance, this.updateMemberForm.value.cv, this.updateMemberForm.value.diplome, this.updateMemberForm.value.photo).subscribe(
          result=>{
            this.router.navigate(['/Member/Detail'],  { queryParams: { id: this.currentUser.id } });
          },
          error=>{
            console.log(error);
          }
        )
      }else{
        this.memberService.UpdateStudent(this.thisId!, this.updateMemberForm.value.firstName, this.updateMemberForm.value.lastName, this.updateMemberForm.value.cin, this.updateMemberForm.value.email, this.updateMemberForm.value.dateNaissance, this.updateMemberForm.value.cv, this.updateMemberForm.value.diplome, this.updateMemberForm.value.photo).subscribe(
          result=>{
            this.router.navigate(['/Member/Detail'],  { queryParams: { id: this.currentUser.id } });
          },
          error=>{
            console.log(error);
          }
        )
      }
    }else{
      if(this.updateMemberForm.value.dateNaissance === null || this.updateMemberForm.value.dateNaissance === undefined){
        this.memberService.UpdateTeacher(this.thisId!, this.updateMemberForm.value.firstName, this.updateMemberForm.value.lastName, this.updateMemberForm.value.cin, this.updateMemberForm.value.email, this.updateMemberForm.value.dateNaissance, this.updateMemberForm.value.cv, this.updateMemberForm.value.grade, this.updateMemberForm.value.etablissement, this.updateMemberForm.value.photo).subscribe(
          result=>{
            this.router.navigate(['/Member/Detail'],  { queryParams: { id: this.currentUser.id } });
          },
          error=>{
            console.log(error);
          }
        )
      }else{
        this.memberService.UpdateTeacher(this.thisId!, this.updateMemberForm.value.firstName, this.updateMemberForm.value.lastName, this.updateMemberForm.value.cin, this.updateMemberForm.value.email, this.updateMemberForm.value.dateNaissance, this.updateMemberForm.value.cv, this.updateMemberForm.value.grade, this.updateMemberForm.value.etablissement, this.updateMemberForm.value.photo).subscribe(
          result=>{
            this.router.navigate(['/Member/Detail'],  { queryParams: { id: this.currentUser.id } });
          },
          error=>{
            console.log(error);
          }
        )
      }
    }
    
  }

  onFileChanges(event:any){
    this.selectedFile = event.target.files[0];
    //console.log(event.target.files[0])
    //this.memberService.setPicture(this.thisId!, this.selectedFile)
  }

  onUpload() {
    console.log(this.selectedFile);
    this.memberService.setPicture(this.thisId!, this.selectedFile)
  }

  
}
