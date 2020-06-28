import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/Models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
declare let alertify: any;

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {

   //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 userArr: User[] = [{
  username: "Beseker",
  email: "Test@Test.com",
  passwordHalt: "admin123456",
  role:"Admin",
 }];
 
 displayColums: string[] =  ["username" , "email" , "passwordHalt" , "passwordSalt" , "role" ,   "ver" , "editar" , "eliminar"];
  dataSource = new MatTableDataSource(this.userArr);

  // User Form
  userForm = new FormGroup({
    username: new FormControl("" , Validators.required),
    email: new FormControl("" , [Validators.required , Validators.email]),
    passwordHalt: new FormControl("" , Validators.required),
    role: new FormControl("" , Validators.required),
  });

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //paginator
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  //Get User Method
  GetUser(element){
    this.userForm.setValue(element);
  }

  //Add User Method
  onUserAdd(form: FormGroup){

    alertify.confirm('Save User', 
    'Do You Want Save this User', function(){
      console.log(form.value); 
      form.reset();
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });

  }

  //Edit User Method
  onUserEdit(form: FormGroup){
    alertify.confirm('Edit User', 
    'Do You Want Edit this User', function(){
      console.log(form.value); 
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });
  }

  //Delete User Method
  onUserDelete(element){
    
    alertify.confirm('Delete User', 
    'Do You Want Delete this User', function(){
      console.log("Delete SuccessFully" , element); 
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });

  }



}
