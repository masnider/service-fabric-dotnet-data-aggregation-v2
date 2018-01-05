webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "header {\r\n  background: #1a1a1a;\r\n}\r\n\r\n  header .header-content {\r\n    padding-top: 10px;\r\n  }\r\n\r\n  header .header-title {\r\n    float: left;\r\n  }\r\n\r\n    header .header-title h2 {\r\n      font-size: 24px;\r\n      font-weight: 100;\r\n      color: #FFF;\r\n      margin: 0;\r\n    }\r\n\r\n    header .header-title h1 {\r\n      font-size: 48px;\r\n      font-weight: 100;\r\n      color: #FF8A00;\r\n      margin: 0 0 20px 0;\r\n    }\r\n\r\n  header .header-login {\r\n    float: right;\r\n    margin-top: 35px;\r\n    line-height: 20px;\r\n  }\r\n\r\n    header .header-login h3 {\r\n      margin: 0;\r\n      padding: 0;\r\n    }\r\n\r\n    header .header-login .login-links {\r\n      float: left;\r\n      text-align: right;\r\n      padding: 0 10px 0 0;\r\n      height: 50px;\r\n      border-right: 1px solid #CCC;\r\n    }\r\n\r\n      header .header-login .login-links a {\r\n        display: block;\r\n        color: #89c402;\r\n      }\r\n\r\n    header .header-login .login-user {\r\n      float: left;\r\n      margin: 0 0 0 10px;\r\n    }\r\n\r\n\r\nsection#main {\r\n  margin: 20px auto;\r\n}\r\n\r\nfooter {\r\n  border-top: 1px solid #333;\r\n}\r\n\r\n#dataStats {\r\n  text-align: center;\r\n  margin: 0 0 10px 0;\r\n}\r\n\r\n  #dataStats ul {\r\n    margin: 0;\r\n    padding: 0;\r\n  }\r\n\r\n    #dataStats ul li {\r\n      list-style: none;\r\n      display: inline;\r\n      margin: 0 10px;\r\n      padding: 0;\r\n      font-size: 24px;\r\n    }\r\n\r\n  #dataStats span {\r\n    font-weight: bold;\r\n    color: #89c402;\r\n  }\r\n\r\n    #dataStats span.statsLabel {\r\n      margin-right: 10px;\r\n      font-weight: normal;\r\n      color: #EEE;\r\n    }\r\n\r\n#infoDiv {\r\n  border-right: 1px solid #333;\r\n  width: 300px;\r\n  min-height: 600px;\r\n  padding: 10px;\r\n}\r\n\r\n.loadingMessage {\r\n  margin: 10px auto;\r\n  font-style: italic;\r\n}\r\n\r\n.healthBox {\r\n  width: 25px;\r\n  height: 20px;\r\n  border: 1px solid #DDD;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  line-height: 20px;\r\n  color: black;\r\n}\r\n\r\n.healthBox-noinfo {\r\n  width: 25px;\r\n  height: 20px;\r\n  border: 1px solid #DDD;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  line-height: 20px;\r\n  color: white;\r\n}\r\n\r\n.countyDoctorList {\r\n  list-style-type: none;\r\n}\r\n\r\n  .countyDoctorList li {\r\n    margin-bottom: 5px;\r\n  }\r\n\r\n.name-and-healthbox span {\r\n  float: left;\r\n  margin: 0 0 0 10px;\r\n  padding: 0;\r\n}\r\n\r\n.name-and-healthbox .healthBox {\r\n  float: left;\r\n}\r\n\r\n.name-and-healthbox .healthBox-black {\r\n  float: left;\r\n}\r\n\r\n.name-and-healthbox .healthBox-noinfo {\r\n  float: left;\r\n}\r\n\r\n.infoBox h4 {\r\n  font-size: 16px;\r\n  background: #111;\r\n  padding: 4px;\r\n}\r\n\r\n#userInfo h4 {\r\n  color: #FF8A00;\r\n}\r\n\r\n#userStats #userUnfo-detailStats {\r\n  margin-top: 10px;\r\n}\r\n\r\n#userStats .name-and-healthbox span {\r\n  font-weight: bold;\r\n}\r\n\r\n#userStats .chartStyle {\r\n  height: 150px;\r\n  width: 300px;\r\n  margin: 0;\r\n}\r\n\r\n#userStats .name-and-healthbox {\r\n  margin-bottom: 5px;\r\n}\r\n\r\n#doctorListStats {\r\n  min-height: 300px;\r\n  overflow-y: auto;\r\n  overflow-x: hidden;\r\n}\r\n\r\n#doctorInfo h4 {\r\n  color: #26C8FF;\r\n}\r\n\r\n#doctorInfo .name-and-healthbox {\r\n  margin: 5px 0;\r\n}\r\n\r\n  #doctorInfo .name-and-healthbox span {\r\n    font-weight: bold;\r\n  }\r\n\r\n#doctorInfo #patientInfoTable {\r\n  margin-top: 20px;\r\n}\r\n\r\n  #doctorInfo #patientInfoTable td {\r\n    padding: 2px 5px;\r\n    max-width: 160px;\r\n    overflow: hidden;\r\n  }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "  <header>\r\n    <div class=\"wrapper clearfix header-content\">\r\n      <div class=\"header-title\">\r\n        <h2>Azure Service Fabric</h2>\r\n        <h1>Health Metrics</h1>\r\n      </div>\r\n      <div class=\"header-login\">\r\n        <div class=\"login-user\">\r\n          <div>welcome</div>\r\n          <h3></h3>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </header>\r\n  <section id=\"main\" class=\"wrapper clearfix\">\r\n    <div id=\"infoDiv\">\r\n      <div id=\"userInfo\" class=\"infoBox\">\r\n        <div id=\"userStats\">\r\n          <h4>Your Stress Dashboard</h4>\r\n          <div class=\"loadingMessage\">Gathering data...</div>\r\n          <div id=\"userInfo-userHealthIndex\" class=\"name-and-healthbox clearfix\"></div>\r\n          <div id=\"userInfo-countyHealthIndex\" class=\"name-and-healthbox clearfix\"></div>\r\n          <div id=\"userUnfo-detailStats\">\r\n            <div id=\"heartRateTable\" class=\"chartStyle\"></div>\r\n            <h1>Application says what?</h1>\r\n            <ul>\r\n              <li *ngFor=\"let value of apiValues\">{{value}}</li>\r\n            </ul>\r\n            <h3>Bar Chart1</h3>\r\n            <app-line-chart *ngIf=\"chartData\" [data]=\"chartData\"></app-line-chart>\r\n          </div>\r\n        </div>\r\n        <div id=\"doctorListStats\">\r\n          <h4>Doctors in your county</h4>\r\n          <div class=\"loadingMessage\">Gathering data...</div>\r\n          <ul class=\"countyDoctorList\"></ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div id=\"map\">\r\n         <!--ng-app=\"healthApp\"\r\n         ng-controller=\"homeController\"\r\n         ng-init=\"init()\">-->\r\n      <div id=\"dataStats\">\r\n        <ul>\r\n          <li><span class=\"statsLabel\">Devices:</span><span id=\"bandsStats\">0</span></li>\r\n          <li><span class=\"statsLabel\">Doctors:</span><span id=\"doctorsStats\">0</span></li>\r\n          <li><span class=\"statsLabel\">Health Reports:</span><span id=\"healthReportsStats\">0</span></li>\r\n          <li><span class=\"statsLabel\">Avg. Reports/Sec:</span><span id=\"messageRate\">0</span></li>\r\n        </ul>\r\n      </div>\r\n      <div id=\"mapContainer\">\r\n        <app-data-map></app-data-map>\r\n        <!--<d3-host val=\"countyData\">\r\n          <svg id=\"usMap\"></svg>\r\n        </d3-host>-->\r\n      </div>\r\n    </div>\r\n  </section>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(_httpService) {
        this._httpService = _httpService;
        this.apiValues = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._httpService.get('/api').subscribe(function (values) {
            _this.apiValues = values.json();
        });
        setTimeout(function () {
            _this.generateData();
            // change the data periodically
            setInterval(function () { return _this.generateData(); }, 3000);
        }, 1000);
    };
    AppComponent.prototype.generateData = function () {
        this.chartData = [];
        for (var i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
            this.chartData.push([
                "Index " + i,
                Math.floor(Math.random() * 100)
            ]);
        }
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_line_chart_line_chart_component__ = __webpack_require__("../../../../../src/app/shared/line-chart/line-chart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_data_map_data_map_component__ = __webpack_require__("../../../../../src/app/shared/data-map/data-map.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__shared_line_chart_line_chart_component__["a" /* LineChartComponent */],
                __WEBPACK_IMPORTED_MODULE_6__shared_data_map_data_map_component__["a" /* DataMapComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/shared/data-map/data-map.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#map {\r\n  padding: 30px 0 0 20px;\r\n}\r\n\r\n#infoDiv {\r\n  float: left;\r\n}\r\n\r\n#map h4 {\r\n  text-align: center;\r\n  margin: 5px;\r\n}\r\n\r\n#usMap {\r\n}\r\n\r\n#colorLegend {\r\n  width: 500px;\r\n  height: 20px;\r\n  margin: 20px auto;\r\n  background-color: #000;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/data-map/data-map.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  data-map works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/shared/data-map/data-map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_topojson__ = __webpack_require__("../../../../topojson/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataMapComponent = (function () {
    function DataMapComponent() {
        this.margin = { top: 20, bottom: 20, left: 20, right: 20 };
    }
    DataMapComponent.prototype.ngOnInit = function () {
        this.createChart();
        //if (this.data) {
        //    this.updateChart();
        //}
    };
    DataMapComponent.prototype.ngOnChanges = function () {
        if (this.chart) {
            this.updateChart();
        }
    };
    DataMapComponent.prototype.createChart = function () {
        var svg = __WEBPACK_IMPORTED_MODULE_1_d3__["i" /* select */]("#usMap");
        console.log(svg.html);
        //var width = ($window.innerWidth) - 350;
        //var height = width * .66;
        //angular.element($window)
        var projection = __WEBPACK_IMPORTED_MODULE_1_d3__["c" /* geoAlbersUsa */]();
        //.scale(width)
        //.translate([width / 2, height / 2]);
        var path = __WEBPACK_IMPORTED_MODULE_1_d3__["d" /* geoPath */]()
            .projection(projection);
        //d3.json("/Content/us-10m.json", function (error, topology: any) {
        __WEBPACK_IMPORTED_MODULE_1_d3__["e" /* json */]("us-10m.json", function (topology) {
            svg.selectAll(".region")
                .data(__WEBPACK_IMPORTED_MODULE_2_topojson__["a" /* feature */](topology, topology.objects.counties).features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr('fill', function (d) { return '#313131'; })
                .attr("id", function (d) { return "p" + d.id; });
        });
    };
    DataMapComponent.prototype.updateChart = function () {
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
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])('chart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ElementRef */])
    ], DataMapComponent.prototype, "chartContainer", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Array)
    ], DataMapComponent.prototype, "data", void 0);
    DataMapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-data-map',
            template: __webpack_require__("../../../../../src/app/shared/data-map/data-map.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/data-map/data-map.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [])
    ], DataMapComponent);
    return DataMapComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/line-chart/line-chart.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*The #chart id will be used to get a reference to the native element. The components size, colors and other attributes can be controlled with CSS. The default component styles are defined barchart.component.css: */\r\n\r\n.d3-chart\r\n{\r\n  width: 100%;\r\n  height: 150px;\r\n}\r\n\r\n.d3-chart .axis path,\r\n.d3-chart .axis line {\r\n  stroke: #999;\r\n}\r\n\r\n.d3-chart .axis text {\r\n  fill: #999;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/line-chart/line-chart.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"d3-chart\" #chart></div>\r\n"

/***/ }),

/***/ "../../../../../src/app/shared/line-chart/line-chart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LineChartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LineChartComponent = (function () {
    function LineChartComponent() {
        this.margin = { top: 20, bottom: 20, left: 20, right: 20 };
    }
    LineChartComponent.prototype.ngOnInit = function () {
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    };
    LineChartComponent.prototype.ngOnChanges = function () {
        if (this.chart) {
            this.updateChart();
        }
    };
    LineChartComponent.prototype.createChart = function () {
        var element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        var svg = __WEBPACK_IMPORTED_MODULE_1_d3__["i" /* select */](element).append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight);
        // chart plot area
        this.chart = svg.append('g')
            .attr('class', 'bars')
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")");
        // define X & Y domains
        var xDomain = this.data.map(function (d) { return d[0]; });
        var yDomain = [0, __WEBPACK_IMPORTED_MODULE_1_d3__["f" /* max */](this.data, function (d) { return d[1]; })];
        // create scales
        this.xScale = __WEBPACK_IMPORTED_MODULE_1_d3__["g" /* scaleBand */]().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        this.yScale = __WEBPACK_IMPORTED_MODULE_1_d3__["h" /* scaleLinear */]().domain(yDomain).range([this.height, 0]);
        // bar colors
        this.colors = __WEBPACK_IMPORTED_MODULE_1_d3__["h" /* scaleLinear */]().domain([0, this.data.length]).range(['red', 'blue']);
        // x & y axis
        this.xAxis = svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', "translate(" + this.margin.left + ", " + (this.margin.top + this.height) + ")")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["a" /* axisBottom */](this.xScale));
        this.yAxis = svg.append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["b" /* axisLeft */](this.yScale));
    };
    LineChartComponent.prototype.updateChart = function () {
        var _this = this;
        // update scales & axis
        this.xScale.domain(this.data.map(function (d) { return d[0]; }));
        this.yScale.domain([0, __WEBPACK_IMPORTED_MODULE_1_d3__["f" /* max */](this.data, function (d) { return d[1]; })]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(__WEBPACK_IMPORTED_MODULE_1_d3__["a" /* axisBottom */](this.xScale));
        this.yAxis.transition().call(__WEBPACK_IMPORTED_MODULE_1_d3__["b" /* axisLeft */](this.yScale));
        var update = this.chart.selectAll('.bar')
            .data(this.data);
        // remove exiting bars
        update.exit().remove();
        // update existing bars
        this.chart.selectAll('.bar').transition()
            .attr('x', function (d) { return _this.xScale(d[0]); })
            .attr('y', function (d) { return _this.yScale(d[1]); })
            .attr('width', function (d) { return _this.xScale.bandwidth(); })
            .attr('height', function (d) { return _this.height - _this.yScale(d[1]); })
            .style('fill', function (d, i) { return _this.colors(i); });
        // add new bars
        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function (d) { return _this.xScale(d[0]); })
            .attr('y', function (d) { return _this.yScale(0); })
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', function (d, i) { return _this.colors(i); })
            .transition()
            .delay(function (d, i) { return i * 10; })
            .attr('y', function (d) { return _this.yScale(d[1]); })
            .attr('height', function (d) { return _this.height - _this.yScale(d[1]); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* ViewChild */])('chart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ElementRef */])
    ], LineChartComponent.prototype, "chartContainer", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Input */])(),
        __metadata("design:type", Array)
    ], LineChartComponent.prototype, "data", void 0);
    LineChartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-line-chart',
            template: __webpack_require__("../../../../../src/app/shared/line-chart/line-chart.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/line-chart/line-chart.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [])
    ], LineChartComponent);
    return LineChartComponent;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map