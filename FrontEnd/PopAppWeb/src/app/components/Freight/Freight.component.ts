import { Component, OnInit, ViewChild } from '@angular/core';
import { Freight } from 'src/app/Models/Freight';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FreigthService } from 'src/app/services/Freigth.service';
declare let alertify: any;


@Component({
  selector: 'app-Freight',
  templateUrl: './Freight.component.html',
  styleUrls: ['./Freight.component.css']
})
export class FreightComponent implements OnInit {

    //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  freightArr: Freight[] = [];

  //Freight Form
  FreightForm = new FormGroup({
    _id: new FormControl(""),
    code: new FormControl("" , Validators.required),
    description: new FormControl("" , Validators.required),
    type: new FormControl("" , Validators.required),
    weight: new FormControl("" , Validators.required)

  });

  displayColums: string[] =  ["code" ,  "type" , "weight" , "description" ,  "ver" , "editar" , "eliminar"];
  dataSource;



  constructor(private freightService: FreigthService) { }

  ngOnInit() {
    this.freightService.GetFreight().subscribe((resp: any)=>{
      this.freightArr = resp.freights;
      this.dataSource = new MatTableDataSource(this.freightArr);
      this.dataSource.paginator = this.paginator;
    });
    
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
      this.FreightForm.controls._id.setValue(element._id);
      this.FreightForm.controls.code.setValue(element.code);
      this.FreightForm.controls.type.setValue(element.type);
      this.FreightForm.controls.weight.setValue(element.weight);
      this.FreightForm.controls.description.setValue(element.description);
  } 

  //Add Freight Method
  onFreightAdd(form: FormGroup){

    const freight: Freight = {
      code: form.value.code,
      type: form.value.type,
      weight: form.value.weight,
      description: form.value.description
    };

   this.freightService.CreateFreight(freight).subscribe((resp: any)=>{

    alertify.confirm(
      "Save Freight",
      "Do You Want Save this Freight?",
      function () {
        
        if(resp.Ok){
          form.reset();
        alertify.success(resp.message);
        }
        
      },
      function () {
        alertify.error("Cancel");
      }
    );

   });

  }

  //Edit Freight Method
  onFreightEdit(form: FormGroup){

    this.freightService.UpdateFreight(form.value._id , form.value)
    .subscribe((resp: any)=>{

      alertify.confirm(
        "Edit Freight",
        "Do You Want Edit this Freight",
        function () {
          
          if(resp.Ok){
            alertify.success(resp.message);
          }
         
        },
        function () {
          alertify.error("Cancel");
        }
      );

    });

  }

  //Delete Freigth Method
  onFreightDelete(element){

    this.freightService.DeleteFreight(element._id).subscribe((resp: any)=>{
      
      alertify.confirm(
        "Delete Freight",
        "Do You Want Delete this Freight?",
        function () {
          if(resp.Ok){
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
