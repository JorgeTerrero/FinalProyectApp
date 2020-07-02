import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Product } from 'src/app/Models/Product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/Product.service';
declare let alertify: any;

@Component({
  selector: 'app-Product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css']
})
export class ProductComponent implements OnInit {

   //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 productArr: Product[] = [];

 displayColums: string[] =  ["name" , "category" , "description" ,   "ver" , "editar" , "eliminar"];
 dataSource: MatTableDataSource<Product>;

  //Product Form
  productForm = new FormGroup({
    _id: new FormControl(""),
    name: new FormControl("" , Validators.required),
    category: new FormControl("" , Validators.required),
    description: new FormControl("" , Validators.required)
  });

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.GetProduct().subscribe((resp:any)=>{
      this.productArr = resp.product;
      this.dataSource  = new MatTableDataSource(this.productArr);
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

  //Get Product Method
  GetProduct(element){
    //this.productForm.setValue(element);
    this.productForm.controls._id.setValue(element._id);
    this.productForm.controls.name.setValue(element.name);
    this.productForm.controls.category.setValue(element.category);
    this.productForm.controls.description.setValue(element.description);
  }

  //Add Product Method
  onProductAdd(form: FormGroup){

    const product: Product ={
        name: form.value.name,
        category: form.value.category,
        description: form.value.description
    };
    
    this.productService.CreateProduct(product).subscribe((resp:any)=>{

      alertify.confirm(
        "Save Product",
        "Do You Want Save this Product?",
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

      this.dataSource._renderChangesSubscription;

    });

  }

    //Edit Product Method
    onProductEdit(form: FormGroup){
        this.productService.UpdateProduct(form.value._id , form.value)
        .subscribe((resp:any)=>{

          alertify.confirm(
            "Edit Product",
            "Do You Want Edit this Product?",
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


      //Delete Product Method
  onProductDelete(element){
     this.productService.DeleteteProduct(element._id)
     .subscribe((resp:any)=>{

      alertify.confirm(
        "Delete Product",
        "Do You Want Delete this Product?",
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
