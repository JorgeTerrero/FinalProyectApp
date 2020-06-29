import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreigthService {

  freightUrl = "http://localhost:3000/api/freight";

constructor(private http: HttpClient) { }

GetFreight(){
  return this.http.get(this.freightUrl);
}

CreateFreight(freight){
  return this.http.post(this.freightUrl , freight);
}

UpdateFreight(_id , freight){
  return this.http.put(`${this.freightUrl}/${_id}` , freight);
}

DeleteFreight(_id){
  return this.http.delete(`${this.freightUrl}/${_id}`);
}

}
