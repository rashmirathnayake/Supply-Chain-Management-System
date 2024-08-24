import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../model/order.model';
import { Product } from '../model/product.model';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

@Input() inputFromParent: String=''

  constructor() { }

  ngOnInit(): void {
  }

  public order=this.inputFromParent;
  public reload(){
    this.ngOnInit()
  }
}
