import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './commons/notfound/notfound.component';
import { HomeComponent } from './commons/home/home.component';
import { QuestionListComponent } from './members/question-list/question-list.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: QuestionListComponent, canActivate: [AuthGuard] },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/register', component: RegisterComponent },
  { path: 'question-list', component: QuestionListComponent },
  { path: 'member-list', component: MemberListComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
