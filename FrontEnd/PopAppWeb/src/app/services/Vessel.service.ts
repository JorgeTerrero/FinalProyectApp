import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VesselService {

  vesselUrl = 'http://localhost:3000/api/vessel';

constructor(private http: HttpClient) { }

  GetVessels(){
    return this.http.get(this.vesselUrl);
  }

  CreateVessel(vessel: any){
     return this.http.post(this.vesselUrl , vessel);
  }

  UpdateVessel(_id , vessel){
    return this.http.put(`${this.vesselUrl}/${_id}` , vessel);
  }

  DeleteVessel(_id){
    return this.http.delete(`${this.vesselUrl}/${_id}`);
  }

}
