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
    @Input() private mapData: Array<any>;
    private chart: any;
    private width: number;
    private height: number;

    constructor() { }

    ngOnInit() {
        this.createMap();
        if (this.mapData) {
            this.updateMap();
        }
    }

    ngOnChanges() {
        if (this.mapData) {
            this.updateMap();
        }
    }

    createMap() {
        const svg = d3.select("#usMap");

        var projection = d3.geoAlbersUsa()
            .scale(1350)
            .translate([1400 / 2, 650 / 2]);

        var path = d3.geoPath()
        .projection(projection);

        //d3.json("us-10m.json", function (topology: any) {
        //    svg.selectAll(".region")
        //        .data(topojson.feature(topology, topology.objects.counties).features)
        //        .enter()
        //        .append("path")
        //        .attr("d", path)
        //        .attr('fill', function (d) { return '#313131'; })
        //        .attr("id", function (d) { return "p" + d.id; });
        //});

    }

    updateMap() {
        this.mapData.forEach((data) => {
            d3.select("path#p" + data[0])
                .transition()
                .duration(100)
                .attr('fill', function (d) {
                    return 'hsl(' + data[1] + ', 100%, 50%)';
                });
        });
    }

    computeColor(HealthIndex) {
        if (HealthIndex.mode == false) {
            return 'hsl(0, 0%, ' + HealthIndex.value + '%)';
        }
        else {
            return 'hsl(' + HealthIndex.value + ', 100%, 50%)';
        }
    }
}
