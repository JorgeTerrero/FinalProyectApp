import { Component, OnInit, ViewChild } from "@angular/core";
import { Vessel } from "src/app/Models/Vessel";
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatDialog } from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormGroup, FormControl , Validators } from '@angular/forms';
declare let alertify: any;



@Component({
  selector: "app-Vessel",
  templateUrl: "./Vessel.component.html",
  styleUrls: ["./Vessel.component.css"],
})
export class VesselComponent implements OnInit {

 //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  


  vessel_Data: Vessel[] = [
    {
      name: "name1",
      code: "code1",
      imo: "imo1",
      flag: "flag1",
      slora: "slora1",
      arrival: "arrival",
    },
    {
      name: "name2",
      code: "code2",
      imo: "imo2",
      flag: "flag2",
      slora: "slora2",
      arrival: "arriva2",
    },
  ];

  displayColums: string[] =  ["name" , "code" , "imo" , "flag" , "slora" , "arrival" , "ver" , "editar" , "eliminar"];
  dataSource = new MatTableDataSource(this.vessel_Data);

  vesselForm = new FormGroup({
      name: new FormControl("" , Validators.required),
      code: new FormControl("" , Validators.required),
      imo: new FormControl("" , Validators.required),
      flag: new FormControl("" , Validators.required),
      slora: new FormControl("" , Validators.required),
      arrival: new FormControl("" , Validators.required),
  });

  constructor() {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  //methods
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //paginator
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  //Add Vessel Method
   onVesselAddSubmit(form: FormGroup){
     //alertify.success('Ready');
    // console.log(this.vesselForm.value);

    alertify.confirm('Save Vessel', 
    'Do You Want Save this Vessel', function(){
      console.log(form.value); 
      form.reset();
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });


   }

   //get Vessel Method
   onGetVessel(element: any){
     //this.vesselForm.controls.name.setValue(element.name);
     this.vesselForm.setValue(element);
   }

   //Edit Vessel Method
   onVesselEditSubmit(form: FormGroup){
    alertify.confirm('Update Vessel', 
    'Do You Want Update this Vessel?', function(){
      console.log(form.value); 
      //form.reset();
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });
   }

   //delete Vessel Method
   onVesselDelete(element){
    alertify.confirm('Delete Vessel', 
    'Do You Want Delete this Vessel?', function(){
      console.log("element Deleted")
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });
   }



   //alertify
   successAlertify(){
     alertify.success("Ready");
   }

}
