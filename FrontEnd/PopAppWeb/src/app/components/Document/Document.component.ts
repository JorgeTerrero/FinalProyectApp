import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Document } from 'src/app/Models/Document';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare let alertify: any;


@Component({
  selector: 'app-Document',
  templateUrl: './Document.component.html',
  styleUrls: ['./Document.component.css']
})
export class DocumentComponent implements OnInit {

   //paginator variable
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 documentArr: Document[] = [{

    title: "title",
    description: "description",
    image: "image.png",

 }];

 displayColums: string[] =  ["title" , "image" , "description" ,   "ver" , "editar" , "eliminar"];
  dataSource = new MatTableDataSource(this.documentArr);

  //document Form
  documentForm = new FormGroup({
    title: new FormControl("" , Validators.required),
    image: new FormControl("" , Validators.required),
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

  //Get Document method
  GetDocument(element){
     this.documentForm.setValue(element);
  }

  //Add Document Method
  onDocumentAdd(form: FormGroup){

    alertify.confirm('Save Document', 
    'Do You Want Save this Document', function(){
      console.log(form.value); 
      form.reset();
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });
  }

  //Edit Document Method
  onDocumentEdit(form: FormGroup){

    alertify.confirm('Edit Document', 
    'Do You Want Edit this Document', function(){
      console.log(form.value); 
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });
  }

  //Add Document Method
  onDocumentDelete(element){

    alertify.confirm('Delete Document', 
    'Do You Want Delete this Document', function(){
      console.log("Document Delete Successfully" , element); 
      alertify.success('Ok') 
    } , function(){ 
                  alertify.error('Cancel');
                });
  }


}
