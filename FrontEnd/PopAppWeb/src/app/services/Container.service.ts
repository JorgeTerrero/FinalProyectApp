import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  containerUrl = 'http://localhost:3000/api/container';

constructor(private http: HttpClient) { }

GetContainer(){
  return this.http.get(this.containerUrl);
}

CreateContainer(container){
  return this.http.post(this.containerUrl , container);
}

UpdateContainer(_id , container){
  return this.http.put(`${this.containerUrl}/${_id}` , container);
}

DeleteContainer(_id){
  return this.http.delete(`${this.containerUrl}/${_id}`);
}

}
