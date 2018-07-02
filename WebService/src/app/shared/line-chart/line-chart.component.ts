import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})


/*OnChanges*/
export class LineChartComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private deviceId: string;
  private margin: any = { top: 20, bottom: 20, left: 50, right: 20 };
  private width: number;
  private height: number;
  private d3precision: number = d3.precisionFixed(0.5);
  private d3format: any = d3.format("." + this.d3precision + "f");
  private extractDateFunc: (d: any) => Date = (d) => { return new Date(d['timestamp']['dateTimeString']) };
  private extractHrFunc: any = (d) => { return +d['heartRate'] };
  private priorData: any;
  private created: boolean = false;

  constructor() { }

  ngOnInit() {

    if (this.deviceId) {
      this.createChart();
    }
    setInterval(() => this.updateChart(), 1000);
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    var that = this;

    let svg = d3.select(element).append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    d3.json("/api/patients/" + this.deviceId + "/", (callback, data: any) => {

      data = data["heartRateHistory"];
      this.priorData = data;
      //console.log(data);

      let xScale = this.extractXScale(data);
      //console.log("xscale set");

      let yScale = this.extractYScale(data);
      //console.log("yscale set");

      let yAxis = d3.axisLeft(yScale);
      //console.log("y axis set");

      yAxis.tickFormat(this.d3format);
      //console.log("yaxis tick format set");

      svg.append("g")
        .attr("transform", "translate(0," + that.height + ")")
        .call(d3.axisBottom(xScale)
          .ticks(5)
          .tickFormat(d3.timeFormat("%m/%d")));

      //console.log("appended x axis");

      svg.append("g")
        .call(yAxis);

      //console.log("appended y axis");

      let xFunc = (d): number => {
        return +xScale(this.extractDateFunc(d).valueOf());
      };

      let yFunc = (d): number => {
        return +yScale(this.extractHrFunc(d));
      };

      let line = d3.line().curve(d3.curveCardinal.tension(1))
        .x(xFunc)
        .y(yFunc);

      svg.append("path")
        .data([data])
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("d", line);
    });

    this.created = true;

  }

  updateChart() {
    if (this.deviceId) {
      if (!this.created) {
        this.createChart();
      }

      const element = this.chartContainer.nativeElement;
      var that = this;
      let svg = d3.select(element).select("svg");

      d3.json("/api/patients/" + this.deviceId + "/", (callback, data: object[]) => {
        data = data["heartRateHistory"];

        let oldDataDictionary = {};
        let pd: object[] = this.priorData;
        pd.forEach(obj => {
          let key = obj['heartRate'];
          let val = obj['timestamp']['dateTimeString'];
          oldDataDictionary[key] = val;
        }
        );

        //console.log("old data dictionary")
        //console.log(oldDataDictionary);

        let newDataDictionary = {}

        data.forEach(obj => {
          let key = obj['heartRate'];
          let val = obj['timestamp']['dateTimeString'];
          if (!(key in oldDataDictionary)) {
            //console.log(key + " NOT found in old data, adding");
            newDataDictionary[key] = val;
          }
        })

        console.log("new data is: ");
        console.log(newDataDictionary);

        this.priorData = data;
      });
      //  data = data["heartRateHistory"];

      //  let xScale = this.extractXScale(data);
      //  let yScale = this.extractYScale(data);

      //  let yAxis = d3.axisLeft(yScale);
      //  yAxis.tickFormat(this.d3format);

      //  svg.append("g")
      //    .attr("transform", "translate(0," + that.height + ")")
      //    .call(d3.axisBottom(xScale)
      //      .ticks(5)
      //      .tickFormat(d3.timeFormat("%m/%d")))
      //    .call(yAxis);

      //  let xFunc = (d): number => {
      //    return +xScale(new Date(d['timestamp']['dateTimeString']).valueOf());
      //  };

      //  let yFunc = (d): number => {
      //    return +yScale(+d['heartRate']);
      //  };

      //  let line = d3.line().curve(d3.curveCardinal.tension(1))
      //    .x(xFunc)
      //    .y(yFunc);

      //  svg.transition("path").duration(100).attr("d", line);

      //});
      //}
    }
  }

  extractXScale(data: any) {
    //console.log("extracting xscale");

    return d3.scaleTime()
      .domain(d3.extent(data, d => {
        //this.extractDateFunc(d).toString()
        return this.extractDateFunc(d);
      }))
      .range([0, this.width]).nice();
  }

  extractYScale(data: any) {
    //console.log("extracting yscale");
    return d3.scaleLinear()
      .range([0, this.height]) //the size or scale of the area
      .domain([d3.max(data,
        (d) => {
          //console.log(d['heartRate']);
          return +this.extractHrFunc(d);
        }), 0]); //the data to map to it
  }
}
