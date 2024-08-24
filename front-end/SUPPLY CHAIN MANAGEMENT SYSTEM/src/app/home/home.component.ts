import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor( private location :Location) { }

  ngOnInit(): void {
  }
  
  public loginPage(){
    this.location.go("/login");
    window.location.reload()
  }

}
