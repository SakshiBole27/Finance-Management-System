import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetails } from './product-details';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private url = "http://localhost:8088"
  constructor(private http : HttpClient ) { }

  getAllProducts(){
    console.log("Function called");
	console.log(this.http.get<ProductDetails[]>(this.url+"/getAllProduct"));
    return this.http.get<ProductDetails[]>(this.url+"/getAllProduct");
  }
}
