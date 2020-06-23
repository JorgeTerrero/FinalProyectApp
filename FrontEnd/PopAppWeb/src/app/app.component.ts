import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Table, Columns   } from 'pdfmake-wrapper';
import { formatDate } from '@angular/common';



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "PopAppWeb";
  date = formatDate(new Date(), "dd/MM/yyyy", "en").toString();
  fakeData = ["Data1", "Data2", "Data3", "Data5", "Date6"];

  products = [
    {
      name: "name1",
      description: "description1",
      category: "Category1",
      quantity: 15
    },
    {
      name: "name2",
      description: "description2",
      category: "Category2",
      quantity: 11
    },
    {
      name:"name3",
      description: "description2",
      category:'Category3',
      quantity: 14
    }
  ];

  freight = [
    {
      title: 'freight1',
      code: "0001-F",
      products: this.products
    },
    {
      title: 'freight2',
      code: "0002-F",
      products: this.products
    }  
  ];

  container =[
    {
      type: "type1",
      company: "company1",
      process: "Import",
      freight: this.freight
    } , 
    {
      type: "type2",
      company: "company12",
      process: "Import",
      freight: this.freight
    },
    {
      type: "type11",
      company: "company132",
      process: "Export",
      freight: this.freight
    }
  ]

  ngOnInit(): void {
    

  }

  GeneratePDF() {
    const pdf = new PdfMakeWrapper();

    pdf.add(new Txt("Reporting").bold().alignment("center").end);

    pdf.add(new Txt(this.date).bold().alignment("right").end);

     
    //report

    const testArr = [];

    this.container.forEach(c =>{
       testArr.push([c.company , c.type , c.process]);
    });

      pdf.add(
        new Columns(testArr).end
      );

    console.log(testArr);

    
    // pdf.footer( {
    //   width: 200,
    //   height: 'auto',
    //   Txt: 'This is the footer'
    // },
    // );

    pdf.create().open();
  }
}
