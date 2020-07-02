import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/Models/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { UserService } from 'src/app/services/User.service';
declare let alertify: any;

@Component({
  selector: 'app-User',
  templateUrl: './User.component.html',
  styleUrls: ['./User.component.css']
})
export class UserComponent implements OnInit {

   //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 userArr: User[] = [];
 
 displayColums: string[] =  ["username" , "email" , "passwordHalt"  , "role" ,   "ver" , "editar" , "eliminar"];
  dataSource:MatTableDataSource<User>;

  // User Form
  userForm = new FormGroup({
    _id: new FormControl(""),
    username: new FormControl("" , Validators.required),
    email: new FormControl("" , [Validators.required , Validators.email]),
    passwordHalt: new FormControl("" , Validators.required),
    role: new FormControl("" , Validators.required),
  });

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.GetUsers().subscribe((resp:any)=>{
      this.userArr = resp.users;
      this.dataSource  = new MatTableDataSource(this.userArr);
      this.dataSource.paginator = this.paginator;
    });
    
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
    this.userForm.controls._id.setValue(element._id);
    this.userForm.controls.username.setValue(element.username);
    this.userForm.controls.email.setValue(element.email);
    this.userForm.controls.passwordHalt.setValue(element.passwordHalt);
    this.userForm.controls.role.setValue(element.role);
  }

  //Add User Method
  onUserAdd(form: FormGroup){

    const user: User ={
      username:form.value.username,
      email: form.value.email,
      passwordHalt: form.value.passwordHalt,
      role: form.value.role
    };

    this.userService.CreateUser(user).subscribe((resp:any)=>{

      alertify.confirm(
        "Save User",
        "Do You Want Save this User?",
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

  //Edit User Method
  onUserEdit(form: FormGroup){
    this.userService.UpdateUser(form.value._id , form.value)
    .subscribe((resp:any)=>{

      alertify.confirm(
        "Edit User",
        "Do You Want Edit this User?",
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

  //Delete User Method
  onUserDelete(element){
    
    this.userService.DeleteUser(element._id).subscribe((resp:any)=>{

      alertify.confirm(
        "Delete User",
        "Do You Want Delete this User?",
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
