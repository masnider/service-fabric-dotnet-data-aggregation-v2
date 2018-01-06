import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private chartData: Array<any>;
    private mapData: Array<any>;
    private apiValues: string[] = [];

    constructor(private _httpService: Http) { }

    ngOnInit() {
        this._httpService.get('/api').subscribe(values => {
            this.apiValues = values.json() as string[];
        })

        setTimeout(() => {
            this.generateChartData();
            this.generateMapData();

            // change the data periodically
            setInterval(() => this.generateChartData(), 3000);
            setInterval(() => this.generateMapData(), 3000);
        }, 1000);
    }

    generateChartData() {
        this.chartData = [];
        for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
            this.chartData.push([
                `Index ${i}`,
                Math.floor(Math.random() * 100)
            ]);
        }
    }

    generateMapData() {
        this.mapData = [];
        for (let i = 1001; i <= 56045; i++) {

            var num = i.toString();

            if (num.length == 4)
            {
                num.padStart(5, "0");
            }
            
            this.mapData.push([i, Math.floor(Math.random() * 100)]);
        }
    }
}
