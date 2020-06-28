import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from 'src/app/Models/Company';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/Company.service';
import { ThrowStmt } from '@angular/compiler';
declare let alertify: any;

@Component({
  selector: 'app-Company',
  templateUrl: './Company.component.html',
  styleUrls: ['./Company.component.css']
})
export class CompanyComponent implements OnInit {

   //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  companyArr: Company[] = [];

  displayColums: string[] =  ["name" , "code" , "adress" , "phone" , "ver" , "editar" , "eliminar"];
  dataSource;

  //Company Form
  companyForm = new FormGroup({
    _id: new FormControl(""),
    name: new FormControl("" , Validators.required),
     code: new FormControl("" , Validators.required),
     adress: new FormControl("" , Validators.required),
     phone: new FormControl("" , Validators.required),
     status: new FormControl("")

  });

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
   this.companyService.GetCompany()
   .subscribe((resp: any)=>{
     this.companyArr = resp.company;
     this.dataSource = new MatTableDataSource(this.companyArr);
     this.dataSource.paginator = this.paginator;
   });
    
  }

   //methods filter
   applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //paginator
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  //Add Company Method
  onCompanyAddSubmit(form: FormGroup){

    const company: Company = {
      name: form.value.name,
      code: form.value.code,
      adress: form.value.adress,
      phone: form.value.phone
    };

    this.companyService.CreateCompany(company).subscribe((resp: any)=>{

      alertify.confirm(
        "Save Company",
        "Do You Want Save this Company?",
        function () {
          
          if(resp.ok){
            form.reset();
            alertify.success(resp.message);
          }
          
        },
        function () {
          alertify.error("Cancel");
        }
      );

      if(resp.ok){
        this.companyArr = [...this.companyArr];
      }

    });
    

  }

  //Get Company Method
  GetCompany(element){
    this.companyForm.controls._id.setValue(element._id);
    this.companyForm.controls.name.setValue(element.name);
    this.companyForm.controls.code.setValue(element.code);
    this.companyForm.controls.adress.setValue(element.adress);
    this.companyForm.controls.phone.setValue(element.phone);

  }

  //Edit Company Method
  onCompanyEditMethod(form: FormGroup){

    this.companyService.UpdateCompany(form.value._id , form.value)
    .subscribe((resp: any)=>{

      alertify.confirm(
        "Edit Company",
        "Do You Want Edit this Company?",
        function () {
         
          if(resp.ok){
            alertify.success(resp.message);
          }
          
        },
        function () {
          alertify.error("Cancel");
        }
      );


    });

  }

  //Delete Companny method
  onCompanyDeleteSubmit(element){
    this.companyService.DeleteCompany(element._id)
    .subscribe((resp: any)=>{

      alertify.confirm(
        "Delete Company",
        "Do You Want Delete this Company",
        function () {
          if(resp.ok){
          alertify.success(resp.message);
          }
        },
        function () {
          alertify.error("Cancel");
        }
      );

    });
  }

}
