import { Product } from "./product.model"
export interface Order{
    items:Product;
    quantity:number
}