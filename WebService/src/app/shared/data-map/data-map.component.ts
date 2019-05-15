import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { FeatureCollection, GeometryCollection, Feature } from 'geojson';

@Component({
  selector: 'app-data-map',
  templateUrl: './data-map.component.html',
  styleUrls: ['./data-map.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DataMapComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private mapData: Array<any>;

  private retrievedData = new Array<string>();
  private updateData = new Array<string>();

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
      this.compareData();
    }
  }

  private async createMap() {

    const svg = d3.select("#usMap");
    var g = svg.append("g");

    var projection = d3.geoAlbersUsa();

    var path = d3.geoPath();

    var topodata: any = await d3.json("https://d3js.org/us-10m.v1.json");

    console.log("data fetched");

    //console.log(topodata);
    //console.log(topodata.objects);
    //console.log(topodata.objects.counties)

    //var nationalMesh = topojson.mesh(topodata, topodata.objects.nation); //WORKS
    //var stateMesh = topojson.feature(topodata, topodata.objects.states); //WORKS
    var countyMesh = (topojson.feature(topodata, topodata.objects.counties) as unknown) as FeatureCollection; //WORKS

    g.selectAll("path")
      .data(countyMesh.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr('fill', function (d) { return '#313131'; })
      .attr("id", (d) => {
        //console.log(d);
        this.retrievedData.push(d.id);
        return "p" + d.id;
      });

  }

  updateMap() {
    this.updateData = new Array<string>();

    this.mapData.forEach((data) => {
      this.updateData.push(data[0]);
      //console.log(data[0]);
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

  sortString(s1, s2) {
    if (s1 > s2) {
      return 1;
    }

    if (s1 < s2) {
      return -1;
    }

    return 0;
  }

  compareData() {
    console.log(this.retrievedData.sort((s1, s2) => { return this.sortString(s1, s1); }));
    console.log(this.updateData.sort((s1, s2) => { return this.sortString(s1, s1); }));
  }
}
