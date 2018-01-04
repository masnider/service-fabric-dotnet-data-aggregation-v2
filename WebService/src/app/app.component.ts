import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private _httpService: Http) { }

    apiValues: string[] = [];

    chartData: string;

    ngOnInit() {
        this._httpService.get('/api').subscribe(values => {
            this.apiValues = values.json() as string[];
        })

        this.chartData = JSON.stringify ({
            "key": "Fruit", "value": [
                { "key": "Apples", "value": 9 },
                { "key": "Oranges", "value": 3 },
                { "key": "Grapes", "value": 5 },
                { "key": "Bananas", "value": 7 }
            ]
        })
    }
}
