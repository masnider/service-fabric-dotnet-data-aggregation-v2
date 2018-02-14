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
        
        setTimeout(() => {
            this.generateMapData();
            // change the data periodically
            setInterval(() => this.generateMapData(), 3000);
            setInterval(() => this.refreshValues(), 3000);
        }, 1000);
    }
  
    generateMapData() {
        this.mapData = [];

        this._httpService.get('/api/mapData').subscribe(values => {
            this.mapData = values.json() as string[];
        })
    }

    refreshValues()
    {
        this._httpService.get('/api').subscribe(values => {
            this.apiValues = values.json() as string[];
        })
    }
}
