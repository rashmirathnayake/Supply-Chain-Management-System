import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShairedService } from './service/shaired.service';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = ' Future Link';

constructor(private router : Router,
            private shaired: ShairedService
            ){}

ngOnInit(): void {
}

 public loggedUser:User={name:"asd",Password:"",User_Id:"",Role_id:0}
  public loginPage(){
    this.router.navigate(['/login'])
  }

  

  refresh(){
    window.location.reload();
  }
}
