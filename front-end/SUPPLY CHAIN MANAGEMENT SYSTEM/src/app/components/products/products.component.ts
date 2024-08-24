import { Component, OnInit } from '@angular/core';
import {  Product } from 'src/app/model/product.model';
import { Person } from 'src/app/model/person.model';
import { ProductService } from 'src/app/service/product.service';
import { AddproductComponent } from 'src/app/addproduct/addproduct.component';
import { Order } from 'src/app/model/order.model';
import { Route } from '@angular/router';
import { ShairedService } from 'src/app/service/shaired.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  constructor(private productService: ProductService,
              private getuser : ShairedService) {
    const data = this.getuser.getDataStream();
        data.subscribe({
            next: (data: string) => {
                this.UserId = data;
            },
            error: (err: any) => {
                console.log(err);
            }
        })
   }

  ngOnInit(): void {
    this.getProduct();

  }
  
  public addWorks :boolean=false;
  public editWorks :boolean=false;
  public activeraw: number =0;
  public selected: boolean = false;
  public highlighted:string="highlighted";
  public isLoading:boolean=false;
  public products: Product []=[];
  public persons: Person []=[]
  public order :Order[]=[]
  public totalPrice:number=0;
  public incheckout:boolean=false;
  public routes:Route[]=[];
  public quantities: number[]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
  public UserId:string='0000'

  public getUserId(){
    const data = this.getuser.getDataStream();
    data.subscribe({
        next: (data: string) => {
            this.UserId = data;
        },
        error: (err: any) => {
            console.log(err);
        }
    })
  }

  public increase(){
    if(this.quantities[this.activeraw]<100){
      this.quantities[this.activeraw] = this.quantities[this.activeraw]+1;
    }
  }

  public decrease(){
    if(this.quantities[this.activeraw]>0){
      this.quantities[this.activeraw] = this.quantities[this.activeraw]-1;
    }
  }

  public select(ii: number){
    this.selected=true,
    this.activeraw=ii
  }

  public deleteit(id: number){
    this.productService.deleteProduct(id).subscribe((res)=>{
      
    });
    this.refresh;
    window.location.reload();
  }

  public showAdd(){
    this.addWorks = true;
    
  }

  public hideAdd(){
    this.addWorks = false;}
    
  public showEdit(){
    this.editWorks = true;
    
  }

  public hideEdit(){
    this.editWorks = false;
    
  }

  public addtocart(item:Product,quantities:number){
    if(quantities!=0){
    let order1= {items:item,quantity:quantities}
    this.order.push(order1)
    this.totalPrice=this.totalPrice+item.price*quantities
    }
    
  }

public  toggleCheckout(){
  this.getRoute();
  if(this.incheckout===false){
    this.incheckout=true;
  }else{this.incheckout=false}
}

public async getRoute(){
  this.productService.getRoutes().subscribe((res)=>{
    this.routes = res.data;
  })
}

public async getProduct(){
  this.productService.getProducts().subscribe((res)=>{
    this.products = res.data;
  })
}
  refresh(){

   this.UserId=this.getuser.getData("UserID")||"";
   console.log(this.UserId)
  }



}
