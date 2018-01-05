import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private chartData: Array<any>;
    private apiValues: string[] = [];

    constructor(private _httpService: Http) { }
    
    ngOnInit() {
        this._httpService.get('/api').subscribe(values => {
            this.apiValues = values.json() as string[];
        })

        setTimeout(() => {
            this.generateData();

            // change the data periodically
            setInterval(() => this.generateData(), 3000);
        }, 1000);
    }

    generateData() {
        this.chartData = [];
        for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
            this.chartData.push([
                `Index ${i}`,
                Math.floor(Math.random() * 100)
            ]);
        }
    }
}
