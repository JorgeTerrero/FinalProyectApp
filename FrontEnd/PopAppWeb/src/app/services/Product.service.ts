import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

productUrl ="http://localhost:3000/api/product";

constructor(private http: HttpClient) { }

GetProduct(){
  return this.http.get(this.productUrl);
}

CreateProduct(product){
  return this.http.post(this.productUrl , product);
}

UpdateProduct(_id , product){
  return this.http.put(`${this.productUrl}/${_id}` , product);
}

DeleteteProduct(_id){
  return this.http.delete(`${this.productUrl}/${_id}`);
}

}
