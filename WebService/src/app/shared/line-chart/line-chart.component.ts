import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Transition, transition as d3Transition } from 'd3-transition';
import { axisBottom, axisLeft } from 'd3-axis';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LineChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private lineData: JSON;
  private margin: any = { top: 20, bottom: 20, left: 50, right: 20 };
  private width: number;
  private height: number;
  private d3precision: number = d3.precisionFixed(0.5);
  private d3format: any = d3.format("." + this.d3precision + "f");
  private extractDateFunc: (d: any) => Date = (d) => { return new Date(d['timestamp']['dateTimeString']) };
  private extractHrFunc: any = (d) => { return +d['heartRate'] };
  private d3Line: any = null;
  private priorData: any;
  private created: boolean = false;
  private transition: Transition<any, any, any, any> = d3Transition().duration(500).ease(d3.easeLinear);

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {
    this.updateChart();
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

    //d3.json("/api/patients/" + this.deviceId + "/", (callback, data: any) => {

    //  data = data["heartRateHistory"];
    //  this.priorData = data;
    //  //console.log(data);

    //  let xScale = this.extractXScale();
    //  //console.log("xscale set");

    //  let yScale = this.extractYScale();
    //  //console.log("yscale set");

    //  let yAxis = d3.axisLeft(yScale);

    //  //console.log("y axis set");

    //  yAxis.tickFormat(this.d3format);
    //  //console.log("yaxis tick format set");

    //  //this.yAxisRef = yAxis;

    //  svg.append("g")
    //    .attr("transform", "translate(0," + that.height + ")")
    //    .call(d3.axisBottom(xScale)
    //      .ticks(5)
    //      .tickFormat(d3.timeFormat("%m/%d")));

    //  //console.log("appended x axis");

    //  svg.append("g")
    //    .call(yAxis);

    //  //console.log("appended y axis");

    //  let xFunc = (d): number => {
    //    return +xScale(this.extractDateFunc(d).valueOf());
    //  };

    //  let yFunc = (d): number => {
    //    return +yScale(this.extractHrFunc(d));
    //  };

    //  this.d3Line = d3.line().curve(d3.curveCardinal.tension(1))
    //    .x(xFunc)
    //    .y(yFunc);

    //  svg.append("path")
    //    .data([this.priorData])
    //    .attr("fill", "none")
    //    .attr("stroke", "#000")
    //    .attr("d", this.d3Line);
    //});

    this.created = true;

  }

  updateChart() {
    //if (this.deviceId) {
      if (!this.created) {
        this.createChart();
    }

      console.log("data inside line onchanges");
      console.log(this.lineData);

      //var that = this;

    //  d3.json("/api/patients/" + this.deviceId + "/", (callback, data: object[]) => {
    //    data = data["heartRateHistory"];

    //    let oldDataDictionary = {};
    //    let pd: object[] = null;

    //    if (this.priorData) {
    //      pd = this.priorData;
    //    }
    //    else {
    //      pd = new Array<object>();
    //    }

    //    pd.forEach(obj => {
    //      let key = obj['heartRate'];
    //      let val = obj['timestamp']['dateTimeString'];
    //      oldDataDictionary[key] = val;
    //    }
    //    );

    //    //console.log("old data dictionary")
    //    //console.log(oldDataDictionary);

    //    let newDataDictionary = {}

    //    data.forEach(obj => {
    //      let key = obj['heartRate'];
    //      let val = obj['timestamp']['dateTimeString'];
    //      if (!(key in oldDataDictionary)) {
    //        //console.log(key + " NOT found in old data, adding");
    //        newDataDictionary[key] = val;
    //      }
    //    })

    //    //console.log("new data is: ");
    //    //console.log(newDataDictionary);
    //    //console.log("old prior data was")
    //    //console.log(this.priorData);
    //    this.priorData = data;
    //    //console.log("new prior data is")
    //    //console.log(this.priorData);
    //    //up to here works :)

    //    let element = this.chartContainer.nativeElement;
    //    let svg = d3.select(element).select("svg");
    //    let path = svg.select("path");
    //    let currentData = path.data();

    //    console.log("current path data");
    //    console.log(currentData);
    //    currentData.shift();
    //    currentData.concat(newDataDictionary);
    //    console.log("adjusted path data")
    //    console.log(currentData);

    //    svg.select("path").data([currentData]);
    //    console.log("applied path data");
    //    console.log(svg.select("path").data());
    //    console.log("data the same?" + (svg.select("path").data() == [currentData]));

    //    //path.attr("d", this.d3Line).data(this.priorData).transition(this.transition);
    //    //svg.append("path")
    //    //  .data([this.priorData])
    //    //  .attr("fill", "none")
    //    //  .attr("stroke", "#000")
    //    //  .attr("d", this.d3Line);
    //  });
    //}
  }

  //extractXScale() {
  //  //console.log("extracting xscale");

  //  return d3.scaleTime()
  //    .domain(d3.extent(this.priorData, d => {
  //      //this.extractDateFunc(d).toString()
  //      return this.extractDateFunc(d);
  //    }))
  //    .range([0, this.width]).nice();
  //}

  //extractYScale() {
  //  //console.log("extracting yscale");
  //  return d3.scaleLinear()
  //    .range([0, this.height]) //the size or scale of the area
  //    .domain([d3.max(this.priorData,
  //      (d) => {
  //        //console.log(d['heartRate']);
  //        return +this.extractHrFunc(d);
  //      }), 0]); //the data to map to it
  //}

  //private drawXAxis() {
  //  d3.select(this.xAxisRef!).call(axisBottom(this.extractXScale()));
  //}

  //private drawYAxis(initialDraw: boolean) {
  //  if (initialDraw) {
  //    d3.select(this.yAxisRef!).call(axisLeft(this.extractYScale()));
  //  } else {
  //    d3.select(this.yAxisRef!)
  //      .transition(this.transition)
  //      .call(axisLeft(this.extractYScale()));
  //  }
  //}
}
