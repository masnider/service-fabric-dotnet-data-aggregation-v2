import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as c3 from 'c3';
import { ChartAPI } from 'c3';
//import { Transition, transition as d3Transition } from 'd3-transition';
//import { axisBottom, axisLeft } from 'd3-axis';

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
  private created: boolean = false;
  private chart: ChartAPI = null;

  constructor() { }

  ngOnInit()
  {

  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.lineData.previousValue != null && changes.lineData.currentValue != null)
    {
      this.createChart(changes);
    }
  }

  createChart(changes: SimpleChanges)
  {
    let oldDataDictionary = {};
    let newDataDictionary = {};
    let newItemCount = 0;
    let xList = [];
    let yList = [];
    let newXList = [];
    let newYList = [];
    xList.push("timeStamp");
    yList.push("stress");
    newXList.push("timeStamp");
    newYList.push("stress");

    
    changes.lineData.previousValue.forEach(obj =>
    {
      let key = obj['heartRate'];
      let val = new Date(obj['timestamp']['dateTimeString']).valueOf();
      oldDataDictionary[key] = val;
    }
    );

    changes.lineData.currentValue.forEach(obj =>
    {
      let key = obj['heartRate'];
      let val = new Date(obj['timestamp']['dateTimeString']).valueOf();

      xList.push(val);
      yList.push(key);

      if (!(key in oldDataDictionary))
      {
        console.log(key + " NOT found in old data, adding");
        newDataDictionary[key] = val;
        newItemCount++;
        newXList.push(val);
        newYList.push(key);
      }
    })

    if (!this.created)
    {
      console.log("creating chart for first time");
      console.log(xList);
      console.log(yList);

      this.chart = c3.generate({
        bindto: '#heartRateTable',
        transition: {
          duration: 100
        },
        interaction: {
          enabled: false
        },
        data: {
          x: 'timeStamp',
          columns: [
            xList,
            yList
          ],
          type: 'line'
        },
        tooltip: {
          show: false
        },
        legend: {
          hide: true
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              count: 5,
              format: '%M:%S'
            },
            padding: {
              left: 0,
              right: 0
            },
            height: 1,
          },
          y: {
            max: 1,
            min: 0,
            tick: {
              values: [0, 1]
            },
            padding: {
              bottom: 0,
              top: 0
            }
          }
        }
      });

      this.created = true;
      console.log("chart created");
    }
    else
    {
      if (newItemCount > 0)
      {
        this.chart.flow({
          columns: [
            newXList,
            newYList
          ]
        });
      }
    }
  }
}
