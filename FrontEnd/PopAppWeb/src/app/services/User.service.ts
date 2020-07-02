import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

userUrl = "http://localhost:3000/api/users";

constructor(private http: HttpClient) { }

GetUsers(){
  return this.http.get(this.userUrl);
}

CreateUser(user){
  return this.http.post(this.userUrl , user);
}

UpdateUser(_id , user){
  return this.http.put(`${this.userUrl}/${_id}` ,user);
}

DeleteUser(_id){
   return this.http.delete(`${this.userUrl}/${_id}`);
}

}
