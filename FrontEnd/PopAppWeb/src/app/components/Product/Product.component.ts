import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Product } from 'src/app/Models/Product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare let alertify: any;

@Component({
  selector: 'app-Product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css']
})
export class ProductComponent implements OnInit {

   //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 productArr: Product[] = [{
   name: "name1",
   description: "description",
   category: "category"
 }];

 displayColums: string[] =  ["name" , "category" , "description" ,   "ver" , "editar" , "eliminar"];
  dataSource = new MatTableDataSource(this.productArr);

  //Product Form
  productForm = new FormGroup({
    name: new FormControl("" , Validators.required),
    category: new FormControl("" , Validators.required),
    description: new FormControl("" , Validators.required)
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

  //Get Product Method
  GetProduct(element){
    this.productForm.setValue(element);
  }

  //Add Product Method
  onProductAdd(form: FormGroup){
    alertify.confirm('Save Product', 
    'Do You Want Save this Product', function(){
      console.log(form.value); 
      form.reset();
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });
  }

    //Edit Product Method
    onProductEdit(form: FormGroup){
      alertify.confirm('Edit Product', 
      'Do You Want Edit this Product', function(){
        console.log(form.value); 
        alertify.success('Ok') 
      } , function(){ 
                    alertify.error('Cancel');
                  });
    }


      //Delete Product Method
  onProductDelete(element){
    alertify.confirm('Delete Product', 
    'Do You Want Delete this Product', function(){
      console.log("Delete Successfull" , element); 
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });
  }


}
