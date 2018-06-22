import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  private healthReportCheckFrequencyInMs: number = 5000;
  private chartData: Array<any>;
  private mapData: Array<any>;
  private statsData: JSON = null;
  private averageData: IAverageDataClass = <IAverageDataClass>{
    lastReportedTime: null,
    lastHealthReportCount: 0,
    currentAverage: -1
  };

  constructor(private _httpService: Http) { }

  ngOnInit() {
    setTimeout(() => {
      this.generateMapData();
      setInterval(() => this.generateMapData(), 3000);
      setInterval(() => this.getTotalStats(), this.healthReportCheckFrequencyInMs);
    }, 1000);
  }

  generateMapData() {
    this.mapData = [];
    this._httpService.get('/api/mapData').subscribe(values => {
      this.mapData = values.json() as string[];
    })
  }

  getTotalStats() {
    this._httpService.get('/api/national/stats').subscribe(values => {
      let data = values.json();
      this.statsData = data;
      //if (this.statsData != null) {
      //  console.log(this.statsData);
      //  console.log(this.statsData["healthReportCount"]);
      //}
    })

    if (this.averageData.lastHealthReportCount == 0) {
      console.log("report count 0 on first load");
      this.averageData.lastHealthReportCount = this.statsData["healthReportCount"];
      console.log("backfilled report count" + this.averageData.lastHealthReportCount);
      this.averageData.lastReportedTime = new Date(this.statsData["startTimeOffset"]["dateTimeString"]);
      console.log("last reported time is " + this.averageData.lastReportedTime + " as value " + this.averageData.lastReportedTime.valueOf());

      let currentTime = new Date();
      let deltaTimeSinceLastReport = (currentTime.valueOf() - this.averageData.lastReportedTime.valueOf()) / 1000;
      console.log("time passed since last check " + deltaTimeSinceLastReport);

      this.averageData.currentAverage = Math.round((this.averageData.lastHealthReportCount / deltaTimeSinceLastReport) * 100) / 100;
      console.log("computed average is " + this.averageData.currentAverage);
    }
    else {
      console.log("prior average: " + this.averageData.currentAverage);
      console.log("prior count of health report checks: " + this.averageData.lastHealthReportCount);
      let deltaReportCountSinceLastReport = this.statsData["healthReportCount"] - this.averageData.lastHealthReportCount;
      console.log("health reports since last check " + deltaReportCountSinceLastReport);
      let currentTime = new Date();
      let deltaTimeSinceLastReport = (currentTime.valueOf() - this.averageData.lastReportedTime.valueOf()) / 1000;
      console.log("time passed since last check " + deltaTimeSinceLastReport);

      this.averageData.currentAverage = Math.round((deltaReportCountSinceLastReport / deltaTimeSinceLastReport) * 100) / 100;
      console.log("new current average " + this.averageData.currentAverage);

      this.averageData.lastHealthReportCount = this.statsData["healthReportCount"];
      console.log("updated total health report count " + this.averageData.lastHealthReportCount);

      this.averageData.lastReportedTime = currentTime;
      console.log("updated last report time");
    }
  }
}

interface IAverageDataClass {
  lastReportedTime: Date;
  lastHealthReportCount: number;
  currentAverage: number;
}

