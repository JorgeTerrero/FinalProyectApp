import { Component, OnInit, ViewChild } from "@angular/core";
import { Vessel } from "src/app/Models/Vessel";
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatDialog } from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormGroup, FormControl , Validators } from '@angular/forms';
import { VesselService } from 'src/app/services/Vessel.service';
declare let alertify: any;



@Component({
  selector: "app-Vessel",
  templateUrl: "./Vessel.component.html",
  styleUrls: ["./Vessel.component.css"],
})
export class VesselComponent implements OnInit {

 //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  


  vesselArr: Vessel[];

  displayColums: string[] =  ["name" , "code" , "imo" , "flag" , "slora" , "arrival" , "ver" , "editar" , "eliminar"];
  dataSource;

  vesselForm = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("" , Validators.required),
      code: new FormControl("" , Validators.required),
      imo: new FormControl("" , Validators.required),
      flag: new FormControl("" , Validators.required),
      slora: new FormControl("" , Validators.required),
      arrival: new FormControl("" , Validators.required),
      status: new FormControl("")
  });

  constructor(private vesselService: VesselService) {}

  ngOnInit() {
    this.vesselService.GetVessels().subscribe((resp: any) => {
      this.vesselArr = resp.vessel;
      this.dataSource = new MatTableDataSource(this.vesselArr);
      this.dataSource.paginator = this.paginator;
      }
      );
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

  //Add Vessel Method
   onVesselAddSubmit(form: FormGroup){
     //alertify.success('Ready');
    // console.log(this.vesselForm.value);
    const vessel: Vessel = form.value;

    this.vesselService.CreateVessel(vessel).subscribe((resp: any)=>{
      
      if(resp.ok === true){
        this.vesselArr = [...this.vesselArr];
      }

      alertify.confirm('Save Vessel', 
    'Do You Want Save this Vessel?', function(){
      
      if(resp.ok === true){
        form.reset();
        alertify.success(resp.message); 

      }
    } , function(){ 
                  alertify.error('Cancel');
                });

    })

    


   }

   //get Vessel Method
   onGetVessel(element: any){
     this.vesselForm.controls._id.setValue(element._id);
     this.vesselForm.controls.name.setValue(element.name);
     this.vesselForm.controls.code.setValue(element.code);
     this.vesselForm.controls.imo.setValue(element.imo);
     this.vesselForm.controls.flag.setValue(element.flag);
     this.vesselForm.controls.slora.setValue(element.slora);
     this.vesselForm.controls.arrival.setValue(element.arrival);

   }

   //Edit Vessel Method
   onVesselEditSubmit(form: FormGroup){

    const vessel: Vessel = {
      name: form.value.name,
      code: form.value.code,
      imo: form.value.imo,
      flag: form.value.flag,
      slora: form.value.slora,
      arrival: form.value.arrival
    };
    
    this.vesselService.UpdateVessel(form.value._id , vessel)
    .subscribe((resp: any) => {

      alertify.confirm('Update Vessel', 
    'Do You Want Update this Vessel?', function(){
        if(resp.ok){
          alertify.success(resp.message); 
        }
    } , function(){ 
                  alertify.error('Cancel');
                });
    });

    
    
   }

   //delete Vessel Method
   onVesselDelete(element){
     
    this.vesselService.DeleteVessel(element._id)
    .subscribe((resp: any) => {
      
      alertify.confirm('Delete Vessel', 
    'Do You Want Delete this Vessel?', function(){
      if(resp.ok){
        alertify.success(resp.message); 
      }
    } , function(){ 
                  alertify.error('Cancel');
                });

    });
   }


}
