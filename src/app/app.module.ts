import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CookieService } from 'ngx-cookie-service';
import { MatIconModule } from '@angular/material/icon'
import { DatePipe } from '@angular/common';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';
import { FirebaseService } from './services/firebase.service';
import { NavbarComponent } from './navbar/navbar.component';
import { MembersComponent } from './members/members.component';
import { PublicationsComponent } from './publications/publications.component';
import { EventsComponent } from './events/events.component';
import { ToolsComponent } from './tools/tools.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdateMemberComponent } from './update-member/update-member.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    MembersComponent,
    PublicationsComponent,
    EventsComponent,
    ToolsComponent,
    MemberDetailComponent,
    UpdateMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AlifeFileToBase64Module
  ],
  providers: [
    DatePipe,
    FirebaseService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
