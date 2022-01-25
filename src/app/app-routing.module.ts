import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { PublicationsComponent } from './publications/publications.component';
import { ToolsComponent } from './tools/tools.component';
import { UpdateMemberComponent } from './update-member/update-member.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'publications',
    component: PublicationsComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'tools',
    component: ToolsComponent
  },
  {
    path: 'Member/Detail',
    component: MemberDetailComponent
  },
  {
    path: 'Member/Update',
    component: UpdateMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
