import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthenticationService } from '../service/authentication.service';
import { ShairedService } from '../service/shaired.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isUpdating: boolean=false;

  userForm = this.fb.group({
    name: ["", Validators.required],
    Password: ["", Validators.required],
    Role_id: [0, ],
    User_Id: ["",],
  });

  constructor(private authenticate : AuthenticationService,
              private setUser :ShairedService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location) { }

  ngOnInit(): void {
  }
  
  get f() {
    return this.userForm.controls;
  }

  public loginsucces : boolean=false;

  public togleloginsucces(){
    if(this.loginsucces==true){
      this.loginsucces=false;
    }else{
      this.loginsucces=true;
    }
  }

  public login() {
    this.location.go("/products");
    console.log("you are doing it");

    this.togleloginsucces()
    window.location.reload();

  }
  onSubmit() {
    const values = this.userForm.value as User;
    this.isUpdating = true;
    console.log(values)
    
    this.authenticate.getUserCount(values as User).subscribe((res) => {
      console.log(this.setUser.UserId); 
      this.isUpdating = false;
      this.setUser.UserId=res.userType.User_Id;
      console.log(this.setUser.UserId); 
      if(res.userType.Role_id==1){
        this.location.go('/products')
       this.setUser.saveData("UserID",res.userType.User_Id);
        window.location.reload();
      }

      this.userForm.reset();
    });
  }



}
