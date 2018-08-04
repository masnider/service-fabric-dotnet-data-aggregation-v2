import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { Transition, transition as d3Transition } from 'd3-transition';
import { axisBottom, axisLeft } from 'd3-axis';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LineChartComponent implements OnInit, OnChanges
{
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private lineData: Array<JSON>;
  private margin: any = { top: 20, bottom: 20, left: 50, right: 20 };
  private width: number;
  private height: number;
  private d3precision: number = d3.precisionFixed(0.5);
  private d3format: any = d3.format("." + this.d3precision + "f");
  private extractDateFunc: (d: any) => Date = (d) => { return new Date(d['timestamp']['dateTimeString']) };
  private extractHrFunc: any = (d) => { return +d['heartRate'] };
  private d3Line: any = null;
  private created: boolean = false;
  private transition: Transition<any, any, any, any> = d3Transition().duration(500).ease(d3.easeLinear);
  private xAxis: any = null;

  constructor() { }

  ngOnInit()
  {
    //this.createChart();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.lineData.previousValue != null && changes.lineData.currentValue != null)
    {
      if (!this.created)
      {
        this.createChart(changes);
      }
      else
      {
        console.log(changes.lineData.currentValue);
        this.updateChart(changes);


      }
    }
  }

  createChart(changes: SimpleChanges)
  {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    var that = this;

    let svg = d3.select(element).append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    let xScale = this.extractXScale(changes.lineData.currentValue);
    //console.log("xscale set");

    let yScale = this.extractYScale(changes.lineData.currentValue);
    //console.log("yscale set");

    let yAxis = d3.axisLeft(yScale);

    //console.log("y axis set");

    yAxis.tickFormat(this.d3format);
    //console.log("yaxis tick format set");

    this.xAxis = svg.append("g")
      .attr("transform", "translate(0," + that.height + ")")
      .call(d3.axisBottom(xScale)
        .ticks(5)
        .tickFormat(d3.timeFormat("%m/%d")));

    //console.log("appended x axis");

    svg.append("g")
      .call(yAxis);

    //console.log("appended y axis");

    let xFunc = (d): number =>
    {
      return +xScale(this.extractDateFunc(d).valueOf());
    };

    let yFunc = (d): number =>
    {
      return +yScale(this.extractHrFunc(d));
    };

    this.d3Line = d3.line().curve(d3.curveCardinal.tension(1))
      .x(xFunc)
      .y(yFunc);

    svg.append("path")
      .data([changes.lineData.currentValue])
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("d", this.d3Line)

    this.created = true;
    console.log("chart created");
  }

  updateChart(changes: SimpleChanges)
  {
    let oldDataDictionary = {};
    changes.lineData.previousValue.forEach(obj =>
    {
      let key = obj['heartRate'];
      let val = obj['timestamp']['dateTimeString'];
      oldDataDictionary[key] = val;
    }
    );

    //let newDataDictionary = {};
    let newItemCount = 0;

    changes.lineData.currentValue.forEach(obj =>
    {
      let key = obj['heartRate'];
      let val = obj['timestamp']['dateTimeString'];
      if (!(key in oldDataDictionary))
      {
        console.log(key + " NOT found in old data, adding");
        //newDataDictionary[key] = val;
        newItemCount++;
      }
    })

    console.log(newItemCount + "new items");

    let element = this.chartContainer.nativeElement;
    let svg = d3.select(element).select("svg");
    let path = svg.select("path");

    let xScale = this.extractXScale(changes.lineData.currentValue);
    this.xAxis.call(xScale);

    path
      .attr("d", this.d3Line(changes.lineData.previousValue))
      .transition(this.transition)
      .attr("d", this.d3Line(changes.lineData.currentValue))
      //.attr("transform", "translate(" + (5 * newItemCount) + "," + (-1 * this.height) + ")");
      .attr("transform", "translate(0," + (-1 * this.height) + ")");




    //svg
    //  .transition()
    //  .attr("transform", "translate(0," + (-1*this.height) + ")")
    //  .call(d3.axisBottom(xScale)
    //    .ticks(5)
    //    .tickFormat(d3.timeFormat("%m/%d")));
  }

  extractXScale(data: Array<JSON>)
  {
    //console.log("extracting xscale");
    //console.log("data for xscale calculation");
    //console.log(this.priorLineData);

    return d3.scaleTime()
      .domain(d3.extent(data, d =>
      {
        //this.extractDateFunc(d).toString()
        return this.extractDateFunc(d);
      }))
      .range([0, this.width]).nice();
  }

  extractYScale(data: Array<JSON>)
  {

    return d3.scaleLinear()
      .range([0, this.height]) //the size or scale of the area
      .domain([d3.max(data,
        (d) =>
        {
          return +this.extractHrFunc(d);
        }), 0]); //the data to map to it
  }
}
