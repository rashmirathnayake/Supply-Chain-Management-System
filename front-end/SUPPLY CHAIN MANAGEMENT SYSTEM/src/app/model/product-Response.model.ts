import { Product } from "./product.model";

export interface ProductResponse{
    massage:string;
    data: Product[];
}