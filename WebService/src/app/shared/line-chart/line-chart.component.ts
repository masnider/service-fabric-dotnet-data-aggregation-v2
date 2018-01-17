import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
//import * as ez from 'd3-ez';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit, OnChanges {
    @ViewChild('chart') private chartContainer: ElementRef;
    @Input() private data: Array<any>;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;
    private valueLine: any;


    constructor() {

    }

    ngOnInit() {
        this.createChart();
        if (this.data) {
            //this.updateChart();
        }
    }

    ngOnChanges() {
        if (this.data) {
            //this.updateChart();
        }
    }

    createChart() {
        const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        var that = this;

        var parseTime = d3.timeParse("%d-%b-%y");
        
        // set the ranges
        var x = d3.scaleTime().range([0, this.width]);
        var y = d3.scaleLinear().range([this.height, 0]);

        // define the line
        this.valueLine = d3.line()
            .x(function (d: any) { return x(d.date); })
            .y(function (d: any) { return y(d.close); });

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select(element).append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");

        // Get the data
        d3.csv("data.csv", function (error, data) {
            if (error) throw error;

            // format the data
            data.forEach(function (d: any) {
                d.date = parseTime(d.date);
                d.close = +d.close;
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function (d: any) { return d.date; }));
            y.domain([0, d3.max(data, function (d: any) { return d.close; })]);

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", that.valueLine);

            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + that.height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

        });
    }
}
