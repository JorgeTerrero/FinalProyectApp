import { Component, OnInit, ViewChild } from '@angular/core';
import { Container } from 'src/app/Models/Container';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  containerArr: Container[] = [{
     type: "type1",
     payload:5,
     capacity: 12 , 
     lenght:5 ,
     width:100,
     height:200,
  }];

  displayColums: string[] =  ["type" , "payload" , "capacity" , "lenght" , "width" , "height" , "ver" , "editar" , "eliminar"];
  dataSource = new MatTableDataSource(this.containerArr);

  //container Form
  containerForm = new FormGroup({
    type: new FormControl("" , Validators.required),
    payload: new FormControl("" , Validators.required),
    capacity: new FormControl("" , Validators.required) , 
    lenght: new FormControl("" , Validators.required) ,
    width: new FormControl("" , Validators.required),
    height: new FormControl("" , Validators.required),
  });

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

    //get Container
    GetContainer(element){
      this.containerForm.setValue(element);
    }

    //Add Container Method
    onContainerAdd(form:FormGroup){

      alertify.confirm('Save Vessel', 
      'Do You Want Save this Vessel', function(){
        console.log(form.value); 
        form.reset();
        alertify.success('Ok') 
      } , function(){ 
                    alertify.error('Cancel');
                  });

    }

    //Edit Container Method
    onContainerEdit(form:FormGroup){

      alertify.confirm('Edit Container', 
      'Do You Want Save this Container', function(){
        console.log(form.value); 
        alertify.success('Ok') 
      } , function(){ 
                    alertify.error('Cancel');
                  });

    }

    //Delete Container Method
    onContainerDelete(element){

      alertify.confirm('Delete Container', 
      'Do You Want Delete this Container', function(){
        console.log("delete Successful:" , element); 
        alertify.success('Ok') 
      } , function(){ 
                    alertify.error('Cancel');
                  });

    }


}
