import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as c3 from 'c3';
import { ChartAPI } from 'c3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html', 
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BarChartComponent implements OnInit, OnChanges
{
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private countyDoctorData: Array<JSON>;
  private margin: any = { top: 20, bottom: 20, left: 50, right: 20 };
  private width: number;
  private height: number;
  private created: boolean = false;
  private chart: ChartAPI = null;

  constructor() { }

  ngOnInit()
  {

  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.countyDoctorData.previousValue != null && changes.countyDoctorData.currentValue != null)
    {
      console.log(changes);
      this.createChart(changes);      
    }
  }

  createChart(changes: SimpleChanges)
  {

    if (!this.created)
    {
      this.chart = c3.generate({
        bindto: '#countyDoctorTable',
        transition: {
          duration: 100
        },
        interaction: {
          enabled: false
        },
        data: {
          columns: [
            ['bob', 1],
            ['charlie', 2]
          ],
          type: 'bar',
          order: 'asc'
        },
        tooltip: {
          show: false
        },
        legend: {
          hide: true
        },
        axis: {
          rotated: true,
        }
      });
      this.created = true;
    }
  }
}
