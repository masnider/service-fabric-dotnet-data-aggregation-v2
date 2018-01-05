import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
    selector: 'app-data-map',
    templateUrl: './data-map.component.html',
    styleUrls: ['./data-map.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataMapComponent implements OnInit, OnChanges {
    @ViewChild('chart') private chartContainer: ElementRef;
    @Input() private data: Array<any>;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;

    constructor() { }

    ngOnInit() {
        this.createChart();
        //if (this.data) {
        //    this.updateChart();
        //}
    }

    ngOnChanges() {
        if (this.chart) {
            this.updateChart();
        }
    }

    createChart() {
        var svg = d3.select("#usMap");
        //var width = ($window.innerWidth) - 350;
        //var height = width * .66;

        //angular.element($window)

        var projection = d3.geoAlbersUsa();
            //.scale(width)
            //.translate([width / 2, height / 2]);

        var path = d3.geoPath()
            .projection(projection);
        
        //d3.json("/Content/us-10m.json", function (error, topology: any) {
        d3.json("us-10m.json", function (topology: any) {
            console.log(topology.objects.counties);
            svg.selectAll(".region")
                .data(topojson.feature(topology, topology.objects.counties).features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr('fill', function (d) { return '#313131'; })
                .attr("id", function (d) { return "p" + d.id; });
        });
    }

    updateChart() {
        //// update scales & axis
        //this.xScale.domain(this.data.map(d => d[0]));
        //this.yScale.domain([0, d3.max(this.data, d => d[1])]);
        //this.colors.domain([0, this.data.length]);
        //this.xAxis.transition().call(d3.axisBottom(this.xScale));
        //this.yAxis.transition().call(d3.axisLeft(this.yScale));

        //const update = this.chart.selectAll('.bar')
        //    .data(this.data);

        //// remove exiting bars
        //update.exit().remove();

        //// update existing bars
        //this.chart.selectAll('.bar').transition()
        //    .attr('x', d => this.xScale(d[0]))
        //    .attr('y', d => this.yScale(d[1]))
        //    .attr('width', d => this.xScale.bandwidth())
        //    .attr('height', d => this.height - this.yScale(d[1]))
        //    .style('fill', (d, i) => this.colors(i));

        //// add new bars
        //update
        //    .enter()
        //    .append('rect')
        //    .attr('class', 'bar')
        //    .attr('x', d => this.xScale(d[0]))
        //    .attr('y', d => this.yScale(0))
        //    .attr('width', this.xScale.bandwidth())
        //    .attr('height', 0)
        //    .style('fill', (d, i) => this.colors(i))
        //    .transition()
        //    .delay((d, i) => i * 10)
        //    .attr('y', d => this.yScale(d[1]))
        //    .attr('height', d => this.height - this.yScale(d[1]));
    }
}
