import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridAngular } from 'ag-grid-angular';

import { AgGridModule } from 'ag-grid-angular';
import { VolumeManagemetComponent } from './volume-managemet/volume-managemet.component';
import { HttpClientModule } from '@angular/common/http';
import "ag-grid-enterprise";

@NgModule({
  declarations: [AppComponent, VolumeManagemetComponent],
  imports: [BrowserModule, AppRoutingModule, AgGridAngular, AgGridModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
