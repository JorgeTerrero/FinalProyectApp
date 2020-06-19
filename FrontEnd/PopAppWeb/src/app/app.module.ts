import { BrowserModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // fonts provided for pdfmake
import {MatInputModule , MatIconModule , MatTableModule, MatButtonModule, MatPaginatorModule, MatDialogModule} from '@angular/material'
import { from } from 'rxjs';
import { VesselComponent } from './components/Vessel/Vessel.component';
import { CompanyComponent  } from './components/Company/Company.component';
import { FormsModule } from '@angular/forms';

 
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    VesselComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
