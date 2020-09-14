import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './View/home/home.component';
import { LoginComponent } from './View/login/login.component';
import { SignupComponent } from './View/signup/signup.component';
import { MessagesComponent } from './View/messages/messages.component';
import { NotfoundComponent } from './View/notfound/notfound.component';
import { MessageDetailsComponent } from './View/message-details/message-details.component';

const routes: Routes = [{
  path: '', component: HomeComponent
},
{ path: 'login', component: LoginComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'messages', component: MessagesComponent },
{ path: 'MessageDetails/:id', component: MessageDetailsComponent },
{ path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
