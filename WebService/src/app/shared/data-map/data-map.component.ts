import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { Topology } from 'topojson-specification';
import { FeatureCollection } from 'geojson';

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

    console.log("fetching json");


    var promise1 = d3.json("https://d3js.org/us-10m.v1.json");
    Promise.all([promise1]).then(function (us: any) {

      console.log(us[0]);

      var feature = (topojson.feature(us[0], us[0].objects.counties) as unknown) as FeatureCollection
      console.log(feature.features);

      svg.selectAll(".region")
        .data(feature.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr('fill', function (d) { return '#313131'; })
        .attr("id", function (d) { return "p" + d.id; });

      //svg.append("path")
      //  .datum(topojson.mesh(us[0], us[0].objects.states, function (a, b) { return a !== b; }))
      //  //.attr("class", "states")
      //  .attr("d", path);
    });
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
