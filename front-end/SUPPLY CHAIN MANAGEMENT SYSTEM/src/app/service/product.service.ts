import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProductResponse } from '../model/add-product-response.model';
import { ProductResponse } from '../model/product-Response.model';
import { deleteProductResponse } from '../model/delete-product-response.model';
import { Product } from '../model/product.model';
import { GetRouteResponse } from '../model/get-route-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private baseUrl='http://localhost:8000/api/products';
  constructor(private http :HttpClient) { }

  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'}),
  };
  addProduct(product : Product) : Observable<AddProductResponse>{
    return this.http.post<AddProductResponse>(this.baseUrl, product ,this.httpOptions)
  }

  getProducts():Observable<ProductResponse>{
    return this.http.get<ProductResponse>(this.baseUrl);
  }

  getRoutes():Observable<GetRouteResponse>{
    return this.http.get<GetRouteResponse>(this.baseUrl+"/route");
  }

  deleteProduct(id : number):Observable<deleteProductResponse>{
    var str1="/";
    const request=this.baseUrl.concat(str1.toString());
    var str2=request.concat(id.toString());
    
    return this.http.get<deleteProductResponse>(str2);
  }
}
