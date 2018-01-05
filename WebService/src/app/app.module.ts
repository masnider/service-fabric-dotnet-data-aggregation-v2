import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LineChartComponent } from './shared/line-chart/line-chart.component';
import { DataMapComponent } from './shared/data-map/data-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    DataMapComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
