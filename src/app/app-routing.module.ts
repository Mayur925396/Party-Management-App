import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'party', component:ReactiveFormsComponent},
  {path:'logout', component:LoggedOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
