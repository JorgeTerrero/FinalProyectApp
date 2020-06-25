import { Component, OnInit, ViewChild } from '@angular/core';
import { Freight } from 'src/app/Models/Freight';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare let alertify: any;


@Component({
  selector: 'app-Freight',
  templateUrl: './Freight.component.html',
  styleUrls: ['./Freight.component.css']
})
export class FreightComponent implements OnInit {

    //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  freightArr: Freight[] = [{
    _id: "jgjgjg",
     code: "code1",
     description: "description",
     type: "type",
     weight: 5
  }];

  //Freight Form
  FreightForm = new FormGroup({
    _id: new FormControl(""),
    code: new FormControl("" , Validators.required),
    description: new FormControl("" , Validators.required),
    type: new FormControl("" , Validators.required),
    weight: new FormControl("" , Validators.required)

  });

  displayColums: string[] =  ["code" , "description" , "type" , "weight" ,  "ver" , "editar" , "eliminar"];
  dataSource = new MatTableDataSource(this.freightArr);



  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  //methods filters
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //paginator
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  //Get Freight Method
  GetFreight(element){
      this.FreightForm.setValue(element);
  } 

  //Add Freight Method
  onFreightAdd(form: FormGroup){

    alertify.confirm('Save Freight', 
    'Do You Want Save this Freight', function(){
      console.log(form.value); 
      form.reset();
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });

  }

  //Edit Freight Method
  onFreightEdit(form: FormGroup){

    alertify.confirm('Edit Freight', 
    'Do You Want Edit this Freight', function(){
      console.log(form.value); 
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });

  }

  //Delete Freigth Method
  onFreightDelete(element){

    alertify.confirm('Delete Freight', 
    'Do You Want Delete this Freight', function(){
      console.log("Delete SuccessFul"); 
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });

  }


}
