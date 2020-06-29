import { Component, OnInit, ViewChild } from '@angular/core';
import { Container } from 'src/app/Models/Container';
import { MatPaginator, MatTableDataSource, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContainerService } from 'src/app/services/Container.service';
declare let alertify: any;

@Component({
  selector: 'app-Container',
  templateUrl: './Container.component.html',
  styleUrls: ['./Container.component.css']
})
export class ContainerComponent implements OnInit {

   //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  //container arr
  containerArr: Container[] = []

  displayColums: string[] =  ["type" , "payload" , "capacity" , "lenght" , "width" , "height" , "ver" , "editar" , "eliminar"];
  dataSource;

  //container Form
  containerForm = new FormGroup({
    _id: new FormControl(""),
    type: new FormControl("" , Validators.required),
    payload: new FormControl("" , Validators.required),
    capacity: new FormControl("" , Validators.required) , 
    lenght: new FormControl("" , Validators.required) ,
    width: new FormControl("" , Validators.required),
    height: new FormControl("" , Validators.required),
  });

  constructor(private containerService: ContainerService) { }

  ngOnInit() {

    this.containerService.GetContainer().subscribe((resp:any)=>{
      this.containerArr = resp.containers;
      this.dataSource = new MatTableDataSource(this.containerArr);
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

    //get Container
    GetContainer(element){
      this.containerForm.controls._id.setValue(element._id);
      this.containerForm.controls.type.setValue(element.type);
      this.containerForm.controls.payload.setValue(element.payload);
      this.containerForm.controls.capacity.setValue(element.capacity);
      this.containerForm.controls.lenght.setValue(element.lenght);
      this.containerForm.controls.width.setValue(element.width);
      this.containerForm.controls.height.setValue(element.height);
    }

    //Add Container Method
    onContainerAdd(form:FormGroup){

      const container: Container ={
        type: form.value.type,
        payload: form.value.payload,
        capacity: form.value.capacity,
        lenght: form.value.lenght,
        width: form.value.width,
        height: form.value.height
      };

      this.containerService.CreateContainer(container).subscribe((resp: any)=>{

        alertify.confirm(
          "Save Container",
          "Do You Want Save this Container?",
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

      });

    }

    //Edit Container Method
    onContainerEdit(form:FormGroup){

     this.containerService.UpdateContainer(form.value._id , form.value)
     .subscribe((resp: any)=>{

      alertify.confirm(
        "Edit Container",
        "Do You Want Save this Container?",
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

    //Delete Container Method
    onContainerDelete(element){

      this.containerService.DeleteContainer(element._id).subscribe((resp: any)=>{

        alertify.confirm(
          "Delete Container",
          "Do You Want Delete this Container?",
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
