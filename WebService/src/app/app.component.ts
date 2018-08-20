import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  private deviceId: string;
  private doctorId: string;
  private mapData: Array<any> = [];
  private lineData: Array<JSON> = null;
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
      this.getIds();
      setInterval(() => this.getLineInfo(), 1000);
      setInterval(() => this.generateMapData(), 3000);
      setInterval(() => this.getTotalStats(), 5000);
    }, 1000);
  }

  getIds() {
    this._httpService.get('/api/GetIds').subscribe(values => {
      let data = values.json() as string[];
      this.deviceId = data["key"];
      this.doctorId = data["value"];
      console.log(this.deviceId + ":" + this.doctorId);
    })
  }

  generateMapData() {
    this._httpService.get('/api/mapData').subscribe(values => {
      this.mapData = values.json() as string[];
    })
  }

  getTotalStats() {
    this._httpService.get('/api/national/stats').subscribe(values => {
      this.statsData = values.json();
    })

    //bail out if we don't have any data yet
    if (this.statsData == null) return;

    if (this.averageData.lastHealthReportCount == 0) {
      //first page load so average data is empty
      //get the current count of health reports from the service data that came back
      this.averageData.lastHealthReportCount = this.statsData["healthReportCount"];
      this.averageData.lastReportedTime = new Date(this.statsData["startTimeOffset"]["dateTimeString"]);

      //figure out the time between when the service was created and now
      //so that you can figure out the messages/second so far
      let currentTime = new Date();
      let deltaTimeSinceLastReport = (currentTime.valueOf() - this.averageData.lastReportedTime.valueOf()) / 1000;
      this.averageData.currentAverage = Math.round((this.averageData.lastHealthReportCount / deltaTimeSinceLastReport) * 100) / 100;
    }
    else {

      //subsequent calls to check for new health reports
      //find out how many health reports we have now vs the last time we checked
      let deltaReportCountSinceLastReport = this.statsData["healthReportCount"] - this.averageData.lastHealthReportCount;

      //figure out how much time has elapsed since the last report
      let currentTime = new Date();
      let deltaTimeSinceLastReport = (currentTime.valueOf() - this.averageData.lastReportedTime.valueOf()) / 1000;

      //compute the average number of health reports per second
      //based on elapsed time since last check and number of messages since then
      this.averageData.currentAverage = Math.round((deltaReportCountSinceLastReport / deltaTimeSinceLastReport) * 100) / 100;

      //save the necessary info for the next round
      this.averageData.lastHealthReportCount = this.statsData["healthReportCount"];
      this.averageData.lastReportedTime = currentTime;
    }
  }

  getLineInfo() {
    if (this.deviceId != null) {
      d3.json("/api/patients/" + this.deviceId + "/", (callback, data: any) => {
        data = data["heartRateHistory"];
        this.lineData = data;
      });
    }
  }
}

interface IAverageDataClass {
  lastReportedTime: Date;
  lastHealthReportCount: number;
  currentAverage: number;
}

