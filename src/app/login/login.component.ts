import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { APICallsService } from '../apicalls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
public user:any;
public FrmSub:boolean=false;
public Token:string="";
public sample:boolean=true;
constructor(private fb:FormBuilder, private auth:AuthService, private api:APICallsService, private route:Router){
  this.user=this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]).{8,}$/)]]
  })
}

ngOnInit(){
  
}
get f(){
  return this.user.controls;
}
  onLogin(){
    this.FrmSub=true;
    if(this.user.valid){
      console.log(this.user.value)
      this.api.loginPage(this.user.value).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.auth.setToken("Token",res.token);
          this.sample=false;
        },
        error:(err:any)=>{
          console.log(err)
        }
        
      })
      this.FrmSub=false;
      this.user.reset()
    }
    
  
    
  }
  logout(){
      this.api.logoutPage({}).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.auth.removeToken('Token');
          this.route.navigateByUrl('logout')
          this.sample=true;
        },
        error:(err:any)=>{
          console.log(err)
        }
      })
  }
}
