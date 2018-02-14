import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  private margin: any = { top: 20, bottom: 20, left: 50, right: 20 };
  private width: number;
  private height: number;
  private xScale: Function;
  private yScale: Function;
  private parseDate = d3.timeParse("%m/%d/%Y %I:%M:%S %p");

  constructor() { }

  ngOnInit() {
    this.createChart();
    setInterval(() => this.updateChart(), 3000);
  }

  ngOnChanges() { }

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

    let data = d3.json("/api/chartData", (callback, data: any) => {

      let xScale = d3.scaleTime()
        .domain(d3.extent(data, d => {
          return this.parseDate(d['date']);
        }))
        .range([0, this.width]).nice();

      let yScale = d3.scaleLinear()
        .range([0, this.height]) //the size or scale of the area
        .domain([d3.max(data, d => { return +d['close']; }), 0]); //the data to map to it

      let p = d3.precisionFixed(0.5);
      let f = d3.format("." + p + "f");

      let yAxis = d3.axisLeft(yScale);
      yAxis.tickFormat(f);

      svg.append("g")
        .attr("transform", "translate(0," + that.height + ")")
        .call(d3.axisBottom(xScale)
          .ticks(5)
          .tickFormat(d3.timeFormat("%m/%d")));

      svg.append("g")
        .call(yAxis);

      let xFunc = (d): number => {
        return +xScale(new Date(d['date']));
      };

      let yFunc = (d): number => {
        return +yScale(+d['close']);
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

  }

  updateChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    var that = this;
    d3.select(element).select("svg").remove();

    let svg = d3.select(element).append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


    let data = d3.json("/api/chartData", (callback, data: any) => {

      let xScale = d3.scaleTime()
        .domain(d3.extent(data, d => {
          return this.parseDate(d['date']);
        }))
        .range([0, this.width]).nice();

      let yScale = d3.scaleLinear()
        .range([0, this.height]) //the size or scale of the area
        .domain([d3.max(data, d => { return +d['close']; }), 0]); //the data to map to it

      let p = d3.precisionFixed(0.5);
      let f = d3.format("." + p + "f");

      let yAxis = d3.axisLeft(yScale);
      yAxis.tickFormat(f);

      svg.append("g")
        .attr("transform", "translate(0," + that.height + ")")
        .call(d3.axisBottom(xScale)
          .ticks(5)
          .tickFormat(d3.timeFormat("%m/%d")));

      svg.append("g")
        .call(yAxis);

      let xFunc = (d): number => {
        return +xScale(new Date(d['date']));
      };

      let yFunc = (d): number => {
        return +yScale(+d['close']);
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
  }
}
