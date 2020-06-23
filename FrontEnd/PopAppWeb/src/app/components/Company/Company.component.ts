import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from 'src/app/Models/Company';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare let alertify: any;

@Component({
  selector: 'app-Company',
  templateUrl: './Company.component.html',
  styleUrls: ['./Company.component.css']
})
export class CompanyComponent implements OnInit {

   //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  companyArr: Company[] = [{
     name: 'name1',
     code: 'code1',
     adress: 'adress1',
     phone: 'phone'
  } , {
    name: 'name1',
     code: 'code1',
     adress: 'adress1',
     phone: 'phone'
  }];

  displayColums: string[] =  ["name" , "code" , "adress" , "phone" , "ver" , "editar" , "eliminar"];
  dataSource = new MatTableDataSource(this.companyArr);

  //Company Form
  companyForm = new FormGroup({

    name: new FormControl("" , Validators.required),
     code: new FormControl("" , Validators.required),
     adress: new FormControl("" , Validators.required),
     phone: new FormControl("" , Validators.required)

  });

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
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

    alertify.confirm('Save Vessel', 
    'Do You Want Save this Vessel?', function(){
      console.log(form.value); 
      form.reset();
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });

  }

  //Get Company Method
  GetCompany(element){
    this.companyForm.setValue(element);
  }

  //Edit Company Method
  onCompanyEditMethod(form: FormGroup){

    alertify.confirm('Edit Vessel', 
    'Do You Want Edit this Company?', function(){
      console.log(form.value); 
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });

  }

  //Delete Companny method
  onCompanyDeleteSubmit(){
    alertify.confirm('Save Vessel', 
    'Do You Want Save this Vessel', function(){
      console.log('Delete Was Complete');
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });
  }

}
