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
exports.push([module.i, "header {\r\n  background: #1a1a1a;\r\n}\r\n\r\n  header .header-content {\r\n    padding-top: 10px;\r\n  }\r\n\r\n  header .header-title {\r\n    float: left;\r\n  }\r\n\r\n    header .header-title h2 {\r\n      font-size: 24px;\r\n      font-weight: 100;\r\n      color: #FFF;\r\n      margin: 0;\r\n    }\r\n\r\n    header .header-title h1 {\r\n      font-size: 48px;\r\n      font-weight: 100;\r\n      color: #FF8A00;\r\n      margin: 0 0 20px 0;\r\n    }\r\n\r\n  header .header-login {\r\n    float: right;\r\n    margin-top: 35px;\r\n    line-height: 20px;\r\n  }\r\n\r\n    header .header-login h3 {\r\n      margin: 0;\r\n      padding: 0;\r\n    }\r\n\r\n    header .header-login .login-links {\r\n      float: left;\r\n      text-align: right;\r\n      padding: 0 10px 0 0;\r\n      height: 50px;\r\n      border-right: 1px solid #CCC;\r\n    }\r\n\r\n      header .header-login .login-links a {\r\n        display: block;\r\n        color: #89c402;\r\n      }\r\n\r\n    header .header-login .login-user {\r\n      float: left;\r\n      margin: 0 0 0 10px;\r\n    }\r\n\r\n\r\nsection#main {\r\n  margin: 20px auto;\r\n}\r\n\r\nfooter {\r\n  border-top: 1px solid #333;\r\n}\r\n\r\n#dataStats {\r\n  text-align: center;\r\n  margin: 0 0 10px 0;\r\n}\r\n\r\n  #dataStats ul {\r\n    margin: 0;\r\n    padding: 0;\r\n  }\r\n\r\n    #dataStats ul li {\r\n      list-style: none;\r\n      display: inline;\r\n      margin: 0 10px;\r\n      padding: 0;\r\n      font-size: 24px;\r\n    }\r\n\r\n  #dataStats span {\r\n    font-weight: bold;\r\n    color: #89c402;\r\n  }\r\n\r\n    #dataStats span.statsLabel {\r\n      margin-right: 10px;\r\n      font-weight: normal;\r\n      color: #EEE;\r\n    }\r\n\r\n#map {\r\n  padding: 30px 0 0 20px;\r\n}\r\n\r\n#infoDiv {\r\n  float: left;\r\n}\r\n\r\n#map h4 {\r\n  text-align: center;\r\n  margin: 5px;\r\n}\r\n\r\n#usMap {\r\n}\r\n\r\n#colorLegend {\r\n  width: 500px;\r\n  height: 20px;\r\n  margin: 20px auto;\r\n  background-color: #000;\r\n}\r\n\r\n#infoDiv {\r\n  border-right: 1px solid #333;\r\n  width: 300px;\r\n  min-height: 600px;\r\n  padding: 10px;\r\n}\r\n\r\n.loadingMessage {\r\n  margin: 10px auto;\r\n  font-style: italic;\r\n}\r\n\r\n.healthBox {\r\n  width: 25px;\r\n  height: 20px;\r\n  border: 1px solid #DDD;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  line-height: 20px;\r\n  color: black;\r\n}\r\n\r\n.healthBox-noinfo {\r\n  width: 25px;\r\n  height: 20px;\r\n  border: 1px solid #DDD;\r\n  text-align: center;\r\n  vertical-align: middle;\r\n  line-height: 20px;\r\n  color: white;\r\n}\r\n\r\n.countyDoctorList {\r\n  list-style-type: none;\r\n}\r\n\r\n  .countyDoctorList li {\r\n    margin-bottom: 5px;\r\n  }\r\n\r\n.name-and-healthbox span {\r\n  float: left;\r\n  margin: 0 0 0 10px;\r\n  padding: 0;\r\n}\r\n\r\n.name-and-healthbox .healthBox {\r\n  float: left;\r\n}\r\n\r\n.name-and-healthbox .healthBox-black {\r\n  float: left;\r\n}\r\n\r\n.name-and-healthbox .healthBox-noinfo {\r\n  float: left;\r\n}\r\n\r\n.infoBox h4 {\r\n  font-size: 16px;\r\n  background: #111;\r\n  padding: 4px;\r\n}\r\n\r\n#userInfo h4 {\r\n  color: #FF8A00;\r\n}\r\n\r\n#userStats #userUnfo-detailStats {\r\n  margin-top: 10px;\r\n}\r\n\r\n#userStats .name-and-healthbox span {\r\n  font-weight: bold;\r\n}\r\n\r\n#userStats .chartStyle {\r\n  height: 150px;\r\n  width: 300px;\r\n  margin: 0;\r\n}\r\n\r\n#userStats .name-and-healthbox {\r\n  margin-bottom: 5px;\r\n}\r\n\r\n#doctorListStats {\r\n  min-height: 300px;\r\n  overflow-y: auto;\r\n  overflow-x: hidden;\r\n}\r\n\r\n#doctorInfo h4 {\r\n  color: #26C8FF;\r\n}\r\n\r\n#doctorInfo .name-and-healthbox {\r\n  margin: 5px 0;\r\n}\r\n\r\n  #doctorInfo .name-and-healthbox span {\r\n    font-weight: bold;\r\n  }\r\n\r\n#doctorInfo #patientInfoTable {\r\n  margin-top: 20px;\r\n}\r\n\r\n  #doctorInfo #patientInfoTable td {\r\n    padding: 2px 5px;\r\n    max-width: 160px;\r\n    overflow: hidden;\r\n  }\r\n\r\npath {\r\n  stroke: #fff;\r\n  stroke-width: .5px;\r\n}\r\n\r\n  path:hover {\r\n    fill: cyan;\r\n  }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "  <header>\r\n    <div class=\"wrapper clearfix header-content\">\r\n      <div class=\"header-title\">\r\n        <h2>Azure Service Fabric</h2>\r\n        <h1>Health Metrics</h1>\r\n      </div>\r\n      <div class=\"header-login\">\r\n        <div class=\"login-user\">\r\n          <div>welcome</div>\r\n          <h3></h3>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </header>\r\n  <section id=\"main\" class=\"wrapper clearfix\">\r\n    <div id=\"infoDiv\">\r\n      <div id=\"userInfo\" class=\"infoBox\">\r\n        <div id=\"userStats\">\r\n          <h4>Your Stress Dashboard</h4>\r\n          <div class=\"loadingMessage\">Gathering data...</div>\r\n          <div id=\"userInfo-userHealthIndex\" class=\"name-and-healthbox clearfix\"></div>\r\n          <div id=\"userInfo-countyHealthIndex\" class=\"name-and-healthbox clearfix\"></div>\r\n          <div id=\"userUnfo-detailStats\">\r\n            <div id=\"heartRateTable\" class=\"chartStyle\"></div>\r\n            <h1>Application says what?</h1>\r\n            <ul>\r\n              <li *ngFor=\"let value of apiValues\">{{value}}</li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n        <div id=\"doctorListStats\">\r\n          <h4>Doctors in your county</h4>\r\n          <div class=\"loadingMessage\">Gathering data...</div>\r\n          <ul class=\"countyDoctorList\"></ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div id=\"map\">\r\n         <!--ng-app=\"healthApp\"\r\n         ng-controller=\"homeController\"\r\n         ng-init=\"init()\">-->\r\n      <div id=\"dataStats\">\r\n        <ul>\r\n          <li><span class=\"statsLabel\">Devices:</span><span id=\"bandsStats\">0</span></li>\r\n          <li><span class=\"statsLabel\">Doctors:</span><span id=\"doctorsStats\">0</span></li>\r\n          <li><span class=\"statsLabel\">Health Reports:</span><span id=\"healthReportsStats\">0</span></li>\r\n          <li><span class=\"statsLabel\">Avg. Reports/Sec:</span><span id=\"messageRate\">0</span></li>\r\n        </ul>\r\n      </div>\r\n      <!--<div id=\"mapContainer\">\r\n        <d3-host val=\"countyData\">\r\n          <svg id=\"usMap\"></svg>\r\n        </d3-host>\r\n      </div>-->\r\n    </div>\r\n  </section>\r\n"

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
        this.chartData = JSON.stringify({
            "key": "Fruit", "value": [
                { "key": "Apples", "value": 9 },
                { "key": "Oranges", "value": 3 },
                { "key": "Grapes", "value": 5 },
                { "key": "Bananas", "value": 7 }
            ]
        });
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
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
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