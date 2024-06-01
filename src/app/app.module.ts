import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MyinterceptorInterceptor } from './myinterceptor.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { LoggedOutComponent } from './logged-out/logged-out.component';




@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormsComponent,
    LoginComponent,
    LoggedOutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,
      useClass:MyinterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


