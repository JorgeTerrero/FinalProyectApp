import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

companyUrl = 'http://localhost:3000/api/company';

constructor(private http: HttpClient) { }


  GetCompany(){
    return this.http.get(this.companyUrl);
  }

  CreateCompany(company){
    return this.http.post(this.companyUrl , company);
  }

  UpdateCompany(_id , company){
    return this.http.put(`${this.companyUrl}/${_id}` , company);
  }

  DeleteCompany(_id){
    return this.http.delete(`${this.companyUrl}/${_id}`);
  }

}
