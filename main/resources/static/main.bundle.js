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

/***/ "../../../../../src/app/_guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "../../../../../src/app/_models/reportfilter.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportFilter; });
var ReportFilter = (function () {
    function ReportFilter(name, value) {
        this.name = name;
        this.value = value;
    }
    return ReportFilter;
}());



/***/ }),

/***/ "../../../../../src/app/_models/scheduledreport.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduledReport; });
var ScheduledReport = (function () {
    function ScheduledReport() {
        this.owner = { id: '' };
    }
    return ScheduledReport;
}());



/***/ }),

/***/ "../../../../../src/app/_services/appsettings.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSettings; });
var AppSettings = (function () {
    function AppSettings() {
    }
    AppSettings.API_ENDPOINT = '/api';
    AppSettings.LOADING_IMAGE = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
    return AppSettings;
}());



/***/ }),

/***/ "../../../../../src/app/_services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.isUserLoggedIn = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](false);
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        if (this.token) {
            this.setLoggedInStatus(true);
        }
        else {
            this.setLoggedInStatus(false);
        }
    }
    AuthenticationService.prototype.checkLoggedInStatus = function () {
        if (this.token) {
            this.setLoggedInStatus(true);
        }
        else {
            this.setLoggedInStatus(false);
        }
    };
    AuthenticationService.prototype.setLoggedInStatus = function (isUserLoggedIn) {
        this.isUserLoggedIn.next(isUserLoggedIn);
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('/api/login', JSON.stringify({ username: username, password: password }))
            .map(function (response) {
            if (response.status < 200 || response.status >= 300) {
                console.log(response.status);
                // return false to indicate failed login
                return false;
            }
            var token = response.headers.get('authorization'); //response.json() &&  && response.json().token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                _this.setLoggedInStatus(true);
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    AuthenticationService.prototype.register = function (username, password) {
        return this.http.post('/api/users/register', JSON.stringify({ username: username, password: password }))
            .map(function (response) {
            if (response.status < 200 || response.status >= 300) {
                console.log(response.status);
                // return false to indicate failed login
                return false;
            }
            else {
                return response;
            }
        });
    };
    AuthenticationService.prototype.forgotPassword = function (username) {
        return this.http.post('/api/users/reset', username)
            .map(function (response) {
            if (response.status < 200 || response.status >= 300) {
                console.log(response.status);
                // return false to indicate failed rest call
                return false;
            }
            else {
                return true;
            }
        });
    };
    AuthenticationService.prototype.validateToken = function (tokenId) {
        var body = JSON.stringify(tokenId);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http.post('/api/users/validate/token/', body, options)
            .map(function (response) {
            if (response.status < 200 || response.status >= 300) {
                console.log(response.status);
                return false;
            }
            else {
                return response;
            }
        });
    };
    AuthenticationService.prototype.validateUser = function (validationObject) {
        var body = JSON.stringify(validationObject);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http.post('/api/users/validate/user/', body, options)
            .map(function (response) {
            if (response.status < 200 || response.status >= 300) {
                console.log(response.status);
                return false;
            }
            else {
                return response;
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.setLoggedInStatus(false);
    };
    AuthenticationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "../../../../../src/app/_services/passwordvalidation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordValidation; });
var PasswordValidation = (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('newPassword').value; // to get value in input tag
        var confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password != confirmPassword) {
            //console.log('false');
            AC.get('confirmPassword').setErrors({ MatchPassword: true });
        }
        else {
            //console.log('true');
            return null;
        }
    };
    return PasswordValidation;
}());



/***/ }),

/***/ "../../../../../src/app/_services/scheduledreport.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduledReportService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ScheduledReportService = (function () {
    function ScheduledReportService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    ScheduledReportService.prototype.getScheduledReports = function () {
        // add authorization header with jwt token
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': this.authenticationService.token });
        //let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        // get scheduled reports from api
        return this.http.get('/api/reports/all', options)
            .map(function (response) {
            return response.json();
        });
    };
    ScheduledReportService.prototype.update = function (url, param) {
        var body = JSON.stringify(param);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .put('/api/reports/' + param.id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ScheduledReportService.prototype.create = function (url, param) {
        var body = JSON.stringify(param);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .post('/api/reports/', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ScheduledReportService.prototype.delete = function (url, param) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .delete('/api/reports/' + param.id, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ScheduledReportService.prototype.viewFile = function (id, param) {
        var body = JSON.stringify(param);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Authorization': this.authenticationService.token, 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        return this.http
            .get('/api/reports/file/' + param.id, { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* ResponseContentType */].Blob })
            .map(function (res) { return res.blob(); })
            .catch(this.handleError);
    };
    ScheduledReportService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ScheduledReportService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs__["Observable"].throw(errMsg);
    };
    ScheduledReportService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */],
            __WEBPACK_IMPORTED_MODULE_5__authentication_service__["a" /* AuthenticationService */]])
    ], ScheduledReportService);
    return ScheduledReportService;
}());



/***/ }),

/***/ "../../../../../src/app/_services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = (function () {
    function UserService() {
        this.isUserInactive = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](false);
    }
    UserService.prototype.setInactiveStatus = function (isUserInactive) {
        this.isUserInactive.next(isUserInactive);
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "../../../../../src/app/_services/utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export extractData */
/* unused harmony export handleError */
/* harmony export (immutable) */ __webpack_exports__["a"] = clearFormArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs__);

function extractData(res) {
    var body = res.json();
    return body || {};
}
function handleError(error) {
    var errMsg = (error.message) ? error.message :
        error.status ? error.status + " - " + error.statusText : 'Server error';
    console.error(errMsg);
    return __WEBPACK_IMPORTED_MODULE_0_rxjs__["Observable"].throw(errMsg);
}
function clearFormArray(formArray) {
    while (formArray.length !== 0) {
        formArray.removeAt(0);
    }
    return formArray;
}


/***/ }),

/***/ "../../../../../src/app/admin/admin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row ml-2 mb-4\">\n      <h2>Site Administration</h2>\n    </div>\n  </div>\n"

/***/ }),

/***/ "../../../../../src/app/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AdminComponent = (function () {
    function AdminComponent() {
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-admin',
            template: __webpack_require__("../../../../../src/app/admin/admin.component.html"),
            styles: [__webpack_require__("../../../../../src/app/admin/admin.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container {\r\n\twidth: 90%;\r\n}\r\n\r\n.full-width {\r\n    width: 100%;\r\n}\r\n\r\n.transparent {\r\n\tbackground-color: rgba(255, 255, 255, 0.0);\r\n}\r\n\r\n.card-no-border {\r\n\tborder:0;\r\n}\r\n\r\n.toolc-jumbotron {\r\n\tbackground: #FFF;\r\n\theight: 100%;\r\n}\r\n\r\n.toolc-container {\r\n    width: 100%;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n  \r\n.toolc-sidenav {\r\n\twidth: 10%;\r\n\tmax-width: 300px;\r\n\tmin-width: 200px;\r\n\tbackground: #A9A9A9;\r\n\tcolor: #fff;\r\n    padding: 10px;\r\n}\r\n\r\n.toolc-sidenav mat-list-item {\r\n\tcolor: #fff;\r\n}\r\n\r\n.toolc-panel {\r\n    margin: 10px;\r\n}\r\n\r\n.pointer {\r\n    cursor: pointer;\r\n}\r\n\r\n.icon-div {\r\n\tvertical-align: bottom;\r\n\tmargin-top: -1px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container fullscreen class=\"toolc-container\">\n\t<mat-sidenav *ngIf=\"isUserLoggedIn\" #sidenav class=\"toolc-sidenav\" role=\"navigation\" mode=\"side\" [(opened)]=\"sidenavOpened\">\n\t\t\t<img width=\"100\" alt=\"Tool C Logo\" src=\"assets/toolc_logo.svg\">\n\t\t\t\n\t\t\t<div>\n\t\t\t<mat-nav-list role=\"list\">\n\t  \t\t\t<mat-list-item role=\"listitem\">\n\t  \t\t\t\t<mat-icon matListIcon>dashboard</mat-icon>\n\t  \t\t\t\t<span><a [routerLink]=\"['/home']\">Dashboard</a></span>\n\t  \t\t\t</mat-list-item>\n                <mat-list-item role=\"listitem\">\n                    <mat-icon matListIcon>history</mat-icon>\n                    <span><a [routerLink]=\"['/history']\">History</a></span>\n                </mat-list-item>\n\t  \t\t\t<mat-list-item role=\"listitem\">\n\t  \t\t\t\t<mat-icon matListIcon>settings</mat-icon>\n\t  \t\t\t\t<span><a [routerLink]=\"['/settings']\">Settings</a></span>\n\t  \t\t\t</mat-list-item>\n\t\t\t</mat-nav-list>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class=\"mt-5\">\n\t\t\t<mat-nav-list role=\"list\">\n\t  \t\t\t<mat-list-item role=\"listitem\" *ngIf=\"isUserAdmin\">\n\t  \t\t\t\t<mat-icon matListIcon>build</mat-icon>\n\t  \t\t\t\t<span><a [routerLink]=\"['/admin']\">Admin</a></span>\n\t  \t\t\t</mat-list-item>\n\t\t\t</mat-nav-list>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class=\"mt-5\">\n\t\t\t<mat-nav-list role=\"list\">\n\t  \t\t\t<mat-list-item role=\"listitem\">\n\t\t\t\t\t<mat-icon matListIcon>close</mat-icon>\t  \t\t\t\t\n\t\t\t\t\t<a [routerLink]=\"['/login']\">Log Out</a>\n\t  \t\t\t</mat-list-item>\n\t\t\t</mat-nav-list>\n\t\t\t</div>\n\t</mat-sidenav>\n    \n\t<mat-sidenav-content class=\"toolc-sidenav-content\">\n\t\t\n\t\t<div *ngIf=\"isUserLoggedIn\" class=\"ml-1\">\n        \t<img *ngIf=\"!sidenavOpened\" src=\"assets/arrow-right.svg\" height=\"20px\" (click)=\"clickMenuArrow(event)\">\n        \t<img *ngIf=\"sidenavOpened\" src=\"assets/arrow-left.svg\" height=\"20px\" (click)=\"clickMenuArrow(event)\">\n\t\t</div>\n\t\t\n\t\t<div class=\"container container-fluid mt-1 mb-1 transparent\">\n\t\t    <div class=\"row\">\n\t\t        \t<div class=\"col-xs-1  align-self-center transparent\">\n\t\t\t\t  \t\t<img width=\"80\" alt=\"Tool C Logo\" src=\"assets/toolc_logo_sm.png\">\n\t\t\t\t  \t</div>\n\t\t        \t<div class=\"col-xs-auto transparent\">\n\t\t        \t\t<div class=\"card card-block card-no-border transparent\"><h2>{{ title }}</h2> </div>\n\t\t\t\t    \t \n\t\t\t\t  \t</div>\n\t\t        \t<div class=\"col-sm-6\">\n\t\t\t\t  \t</div>\n\t\t    </div>\n\t\t</div>\n\t\t\n\t\t<div class=\"jumbotron jumbotron-fluid toolc-jumbotron\">\n\t\t\t<div class=\"col-md-auto\">\n\t\t    \t<router-outlet></router-outlet>\n\t\t    </div>\n\t\t</div>\n\t</mat-sidenav-content>\t\t\t\n</mat-sidenav-container>\t\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
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
    function AppComponent(authenticationService) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.title = 'Tool C Webapp';
        this.sidenavOpened = true;
        this.isUserAdmin = true;
        this.isUserLoggedIn = false;
        this.authenticationService.isUserLoggedIn.subscribe(function (value) { return _this.isUserLoggedIn = value; });
    }
    AppComponent.prototype.clickMenuArrow = function ($event) {
        this.sidenavOpened = !this.sidenavOpened;
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DemoMaterialModule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_cdk_table__ = __webpack_require__("../../../cdk/esm5/table.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__guards_auth_guard__ = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_scheduledreport_service__ = __webpack_require__("../../../../../src/app/_services/scheduledreport.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_user_service__ = __webpack_require__("../../../../../src/app/_services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular_datatables__ = __webpack_require__("../../../../angular-datatables/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__settings_settings_component__ = __webpack_require__("../../../../../src/app/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__history_history_component__ = __webpack_require__("../../../../../src/app/history/history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__admin_admin_component__ = __webpack_require__("../../../../../src/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__resetpassword_resetpassword_component__ = __webpack_require__("../../../../../src/app/resetpassword/resetpassword.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__register_register_component__ = __webpack_require__("../../../../../src/app/register/register.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var DemoMaterialModule = (function () {
    function DemoMaterialModule() {
    }
    DemoMaterialModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            exports: [
                __WEBPACK_IMPORTED_MODULE_6__angular_cdk_table__["m" /* CdkTableModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MatAutocompleteModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MatButtonToggleModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MatChipsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["B" /* MatStepperModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["i" /* MatExpansionModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["j" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["o" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["p" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["q" /* MatPaginatorModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["r" /* MatProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["s" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["t" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["u" /* MatRippleModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["v" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["w" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["y" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["x" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["z" /* MatSnackBarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["A" /* MatSortModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["C" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["D" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["F" /* MatTooltipModule */],
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_16__settings_settings_component__["a" /* SettingsComponent */], __WEBPACK_IMPORTED_MODULE_17__history_history_component__["a" /* HistoryComponent */], __WEBPACK_IMPORTED_MODULE_18__admin_admin_component__["a" /* AdminComponent */], __WEBPACK_IMPORTED_MODULE_19__resetpassword_resetpassword_component__["a" /* ResetpasswordComponent */], __WEBPACK_IMPORTED_MODULE_20__register_register_component__["a" /* RegisterComponent */]]
        })
    ], DemoMaterialModule);
    return DemoMaterialModule;
}());

var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__app_routing__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_15_angular_datatables__["a" /* DataTablesModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["o" /* MatMenuModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["l" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["m" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["j" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["n" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["v" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["E" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["C" /* MatTableModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["w" /* MatSidenavModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_13__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_14__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_16__settings_settings_component__["a" /* SettingsComponent */],
                __WEBPACK_IMPORTED_MODULE_18__admin_admin_component__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_17__history_history_component__["a" /* HistoryComponent */],
                __WEBPACK_IMPORTED_MODULE_19__resetpassword_resetpassword_component__["a" /* ResetpasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_20__register_register_component__["a" /* RegisterComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__guards_auth_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_10__services_authentication_service__["a" /* AuthenticationService */],
                __WEBPACK_IMPORTED_MODULE_11__services_scheduledreport_service__["a" /* ScheduledReportService */],
                __WEBPACK_IMPORTED_MODULE_12__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* BaseRequestOptions */]
                // providers used to create fake backend
                //fakeBackendProvider,
                //MockBackend,
                //BaseRequestOptions
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login_component__ = __webpack_require__("../../../../../src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings_settings_component__ = __webpack_require__("../../../../../src/app/settings/settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_admin_component__ = __webpack_require__("../../../../../src/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__history_history_component__ = __webpack_require__("../../../../../src/app/history/history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__register_register_component__ = __webpack_require__("../../../../../src/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__guards_auth_guard__ = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__resetpassword_resetpassword_component__ = __webpack_require__("../../../../../src/app/resetpassword/resetpassword.component.ts");









var appRoutes = [
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_1__login_login_component__["a" /* LoginComponent */] },
    { path: 'resetpassword/:tokenid', component: __WEBPACK_IMPORTED_MODULE_8__resetpassword_resetpassword_component__["a" /* ResetpasswordComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_6__register_register_component__["a" /* RegisterComponent */] },
    { path: 'register/:tokenid', component: __WEBPACK_IMPORTED_MODULE_6__register_register_component__["a" /* RegisterComponent */] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'settings', component: __WEBPACK_IMPORTED_MODULE_3__settings_settings_component__["a" /* SettingsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'admin', component: __WEBPACK_IMPORTED_MODULE_4__admin_admin_component__["a" /* AdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'history', component: __WEBPACK_IMPORTED_MODULE_5__history_history_component__["a" /* HistoryComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_7__guards_auth_guard__["a" /* AuthGuard */]] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(appRoutes);


/***/ }),

/***/ "../../../../../src/app/history/history.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/history/history.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row ml-2 mb-4\">\n    <h2>Report History</h2>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/history/history.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HistoryComponent = (function () {
    function HistoryComponent() {
    }
    HistoryComponent.prototype.ngOnInit = function () {
    };
    HistoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-history',
            template: __webpack_require__("../../../../../src/app/history/history.component.html"),
            styles: [__webpack_require__("../../../../../src/app/history/history.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HistoryComponent);
    return HistoryComponent;
}());



/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".full-width {\r\n  width: 100%;\r\n}\r\n\r\n.formDetailSidenav {\r\n\twidth: 500px;\r\n}\r\n\r\n.mat-sidenav-container {\r\n\tmin-height: 650px;\r\n}\r\n\r\n.mat-raised-button-primary{\r\n\tcolor: #FFF;\r\n  background-color: #000080;\r\n}\r\n\r\n.form-disabled {\r\n\tcolor: gray;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "\t\n<div class=\"container-fluid\">\n\t<div class=\"row ml-2 mb-4\">\n    \t<h2>Dashboard</h2>\n    </div>\n\t\n    <mat-sidenav-container> \n\t    <mat-sidenav-content> \n\t        <div class=\"col-lg-12\">\n\t\t        <table id=\"scheduledReports\" datatable [dtOptions]=\"dtOptions\" [dtTrigger]=\"dtTrigger\" class=\"row-border hover\">\n\t\t        \t<thead>\n\t\t\t        \t<tr>        \t\n\t\t\t        \t\t<!-- <th></th> -->\n\t\t\t        \t\t<th *ngIf=\"showOwnerId\">Owner ID</th>\n\t\t\t        \t\t<th>Report Name</th>\n\t\t\t        \t\t<th>Format</th>\n\t\t\t        \t\t<th>Delivery</th>\n\t\t\t        \t\t<th>Schedule Type</th>\n\t\t\t        \t\t<th></th>\n\t\t\t        \t\t<!-- <th></th> -->\n\t\t\t        \t\t<th></th>\n\t\t\t        \t</tr>\n\t\t        \t</thead>\n\t\t        \t<tbody>\n\t\t\t        \t<tr *ngFor=\"let report of reports\" (reportsUpdated)=\"onReportsUpdated($event)\">\n\t\t\t        \t\t<!-- <td>{{reports.indexOf(report) + 1}}. </td> -->\n\t\t\t        \t\t<td *ngIf=\"showOwnerId\">{{report.owner.id}}</td>\n\t\t\t        \t\t<td>{{report.name}}</td>\n\t\t\t        \t\t<td>{{report.format}}</td>\n\t\t\t        \t\t<td>{{report.delivery}}</td>\n\t\t\t        \t\t<td>{{report.scheduleType}}</td>\n\t\t\t        \t\t<td><mat-icon style=\"cursor:pointer\" id=\"{{report.id}}\" (click)=\"onClickEdit(reports.indexOf(report))\">create</mat-icon></td>\n\t\t\t        \t\t<!-- <td><mat-icon style=\"cursor:pointer\" id=\"{{report.id}}\" (click)=\"onClickView(reports.indexOf(report))\">search</mat-icon></td> -->\n\t\t\t        \t\t<td><mat-icon style=\"cursor:pointer\" id=\"{{report.id}}\" (click)=\"onClickRemove(reports.indexOf(report))\">delete</mat-icon></td>\n\t\t\t        \t</tr>\n\t\t        \t</tbody>\n\t\t        </table>\n\t        </div>\n            <div class=\"row ml-4 mt-2\" style=\"width:500px;\">\n               <div class=\"col-lg-auto\">\n                    <div class=\"row pointer\" style=\"cursor: pointer;\" (click)=\"onClickAddReport($event)\">\n                        <div class=\"col-xs-1 mr-1\"><mat-icon>add</mat-icon></div>\n                        <div class=\"col-md-auto\"><h5>Create Scheduled Report</h5></div>\n                    </div>\n               </div>\n            </div>\n\t    </mat-sidenav-content>\n\t    \n\t    <mat-sidenav class=\"formDetailSidenav\" #formDetail position=\"end\" mode=\"over\" [(opened)]=\"formDetailOpened\">    \n\t    \t<div class=\"container\">\n\t    \t<div class=\"row ml-2 mb-3\">\n\t\t\t\t<h4> \n\t\t\t\t\t<span *ngIf=\"isAddReportForm\">Add New Report</span>\n\t\t\t\t\t<span *ngIf=\"!isAddReportForm\">Edit Report</span>\n\t\t\t\t</h4>\n\t\t\t</div>\n\t    \t\n\t\t\t<form [formGroup]=\"reportDetailForm\" (ngSubmit)=\"doSubmit($event)\">\n\t\t\t\t<div class=\"\">\n\t\t\t\t\t<mat-form-field class=\"mat-block full-width\">\n\t\t\t\t\t\t<input matInput class=\"form-disabled\" formControlName=\"id\" placeholder=\"Report ID\" type=\"text\" [readonly]=\"true\" >\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<!-- <div  class=\"\" formGroupName=\"owner\">\n\t\t\t\t\t<mat-form-field class=\"full-width\">\n\t\t\t\t\t\t<input matInput class=\"\"  formControlName=\"id\" placeholder=\"Owner ID\" type=\"text\" [readonly]=\"true\" >\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</div> -->\n\t\t\t\t\n\t\t\t\t<div class=\"\">\n\t\t\t\t\t<mat-form-field class=\"full-width\">\n\t\t\t\t    \t<input matInput class=\"\"  formControlName=\"name\" placeholder=\"Report name\">\n\t\t\t\t    </mat-form-field>\n\t\t    \t\t<small [hidden]=\"reportDetailForm.controls.name.valid || (reportDetailForm.controls.name.pristine && !submitted)\">\n\t\t\t\t        Name is required (minimum 5 characters).\n\t\t\t\t    </small>\n\t\t\t    </div>\n\t\t\t    \n\t\t\t    <div class=\"\">\n\t\t\t\t\t<mat-form-field class=\"full-width\">\n\t\t\t    \t<input matInput class=\"\" formControlName=\"url\" type=\"url\" placeholder=\"Report URL\">\n\t\t\t    \t</mat-form-field>\n\t\t\t    \t<mat-error *ngIf=\"!reportDetailForm.controls.url.valid && !reportDetailForm.controls.url.pristine\">\n\t\t\t    \t\tURL is required\n\t\t\t    \t</mat-error>\n\t\t\t    </div>\n\t\t\t    \n\t\t\t    <div class=\"\">\n\t\t\t\t\t<mat-form-field class=\"full-width\">\n\t\t\t\t\t    <mat-select class=\"\" name=\"format\" formControlName=\"format\" placeholder=\"Format Options\">\n\t\t\t\t\t        <mat-option *ngFor=\"let i of formatOptions\" [value]=\"i.value\">  \n\t\t\t\t\t\t        {{i.display}}\n\t\t\t\t\t        </mat-option>\n\t\t\t\t\t    </mat-select>\n\t\t\t\t    </mat-form-field>\n\t\t\t    </div>\n\t\t\t    \n\t\t\t    <div class=\"\">\n\t\t\t\t\t<mat-form-field class=\"full-width\">\n\t\t\t\t\t    <mat-select class=\"\" name=\"delivery\" formControlName=\"delivery\" placeholder=\"Delivery Options\">\n\t\t\t\t\t        <mat-option *ngFor=\"let i of deliveryOptions\" [value]=\"i.value\">  \n\t\t\t\t\t\t        {{i.display}}\n\t\t\t\t\t        </mat-option>\n\t\t\t\t\t    </mat-select>\n\t\t\t\t    </mat-form-field>\n\t\t\t    </div>\n\t\t\t    \n\t\t\t    <div class=\"\">\n\t\t\t\t\t<mat-form-field class=\"full-width\">\n\t\t\t\t\t    <mat-select class=\"\" name=\"scheduleType\" formControlName=\"scheduleType\" (change)=\"onScheduleChange($event)\" placeholder=\"Delivery Schedule\">\n\t\t\t\t\t        <mat-option *ngFor=\"let i of scheduleOptions\" [value]=\"i.value\">  \n\t\t\t\t\t\t        {{i.display}}\n\t\t\t\t\t        </mat-option>\n\t\t\t\t\t    </mat-select>\n\t\t\t\t    </mat-form-field>\n\t\t\t    </div>\n\t\t\t    \n\t\t\t    <div class=\"\" *ngIf=\"showDayOfWeek\">\n\t\t\t\t\t<mat-form-field class=\"full-width\">\n\t\t\t\t\t    <mat-select class=\"\" name=\"dayOfWeek\" formControlName=\"dayOfWeek\" placeholder=\"Day Of Week\">\n\t\t\t\t\t        <mat-option *ngFor=\"let i of dayOfWeekOptions\" [value]=\"i\">  \n\t\t\t\t\t\t        {{i}}\n\t\t\t\t\t        </mat-option>\n\t\t\t\t\t    </mat-select>\n\t\t\t\t    </mat-form-field>\n\t\t\t    </div>\n\t\t\t    \n\t\t\t    <div class=\"\"  *ngIf=\"showDayOfMonth\">\n\t\t\t\t\t<mat-form-field class=\"full-width\">\n\t\t\t\t\t    <mat-select class=\"\" name=\"dayOfMonth\" formControlName=\"dayOfMonth\" placeholder=\"Day Of Month\">\n\t\t\t\t\t        <mat-option *ngFor=\"let i of dayOfMonthOptions\" [value]=\"i\">  \n\t\t\t\t\t\t        {{i}}\n\t\t\t\t\t        </mat-option>\n\t\t\t\t\t    </mat-select>\n\t\t\t\t    </mat-form-field>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"mt-3\"><h5>Additional Emails</h5></div>\n\t\t\t\t<div class=\"ml-2 mt-1\">\n\t\t\t\t\t<mat-form-field class=\"full-width\">\n\t\t\t\t\t\t<input matInput class=\"\" formControlName=\"emails\" placeholder=\"Email List (comma-separated)\" />\n\t\t\t\t\t</mat-form-field>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"mt-3\"><h5>Filters</h5></div>\n\t\t\t\t<div class=\"ml-2 mt-1\">\n\t\t\t\t\t<div class=\"\" formArrayName=\"filters\"\n\t\t\t\t\t\t*ngFor=\"let filter of reportDetailForm.get('filters').controls; let i = index;\" >\n\t\t\t\t\t\t<!-- <div>Filter {{i}}</div> -->\n\t\t\t\t\t\t<div class=\"row\" [formGroupName]=\"i\">\n\t\t\t\t\t\t\t<mat-form-field class=\"col-md-5\">\n\t\t\t\t\t\t\t\t<input matInput class=\"\" formControlName=\"name\" placeholder=\"Name\">\n\t\t\t\t\t\t\t</mat-form-field>\n\n\t\t\t\t\t\t\t<mat-form-field class=\"col-md-5\">\n\t\t\t\t\t\t\t\t<input matInput class=\"\" formControlName=\"value\" placeholder=\"Value\">\n\t\t\t\t\t\t\t</mat-form-field>\n\n\t\t\t\t\t\t\t<div class=\"col-md-2\" style=\"cursor: pointer;\" (click)=\"onClickRemoveFilter(i)\"><mat-icon>remove_circle_outline</mat-icon></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"text-right\" style=\"cursor: pointer;\" (click)=\"onClickAddFilter($event)\">+ Add Filter</div>\n\t\t\t\t</div>\n\t\t\t    \n\t\t\t    <div class=\"form-group mt-2\">\n\t\t\t    \t<button mat-raised-button class=\"mat-raised-button-secondary\" type=\"button\" (click)=\"onClickCancel($event)\">Cancel</button>\n\t\t\t    \t<button mat-raised-button class=\"mat-raised-button-primary\" [disabled]=\"!reportDetailForm.valid\" type=\"submit\">Submit</button>\n\t\t\t    </div>\n\t\t\t    \n\t\t\t</form>\n\t\t\t</div>\n\t    </mat-sidenav>\t \n    </mat-sidenav-container>\n            \n\n</div>\n\n<!-- <div>\n<mat-table #table [dataSource]=\"dataSource\">\n    <ng-container matColumnDef=\"name\">\n      <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>\n      <mat-cell *matCellDef=\"let element\"> {{element.name}} </mat-cell>\n    </ng-container>\n    \n    <mat-header-row *matHeaderRowDef=\"['name']\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: ['name'];\"></mat-row>\n</mat-table>\n</div> -->"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_scheduledreport__ = __webpack_require__("../../../../../src/app/_models/scheduledreport.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_reportfilter__ = __webpack_require__("../../../../../src/app/_models/reportfilter.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_scheduledreport_service__ = __webpack_require__("../../../../../src/app/_services/scheduledreport.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_user_service__ = __webpack_require__("../../../../../src/app/_services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_utils__ = __webpack_require__("../../../../../src/app/_services/utils.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomeComponent = (function () {
    function HomeComponent(reportService, fb, router, userService) {
        this.reportService = reportService;
        this.fb = fb;
        this.router = router;
        this.userService = userService;
        this.reports = [];
        this.currentReport = null;
        this.dtOptions = {};
        this.dtTrigger = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["a" /* Subject */]();
        this.formatOptions = [
            { value: 'PDF', display: 'PDF' },
            { value: 'CSV', display: 'CSV' },
            { value: 'PNG', display: 'PNG' },
            { value: 'TXT', display: 'TXT' }
        ];
        this.scheduleOptions = [
            { value: 'Daily', display: 'Daily' },
            { value: 'Weekly', display: 'Weekly' },
            { value: 'Monthly', display: 'Monthly' }
        ];
        this.deliveryOptions = [
            { value: 'Email', display: 'Email' },
            { value: 'Link', display: 'Link' },
            { value: 'FTP', display: 'FTP' },
            { value: 'SFTP', display: 'SFTP' },
            { value: 'API', display: 'API' }
        ];
        this.dayOfWeekOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.timeOfDayOptions = [];
        this.dayOfMonthOptions = [];
        this.formDetailOpened = false;
        this.showDayOfWeek = false;
        this.showDayOfMonth = false;
        this.isAddReportForm = true;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initReportDetailForm();
        this.dtOptions = {
            searching: false,
            columnDefs: [{
                    targets: [4, 5],
                    orderable: false
                }]
        };
        for (var i = 1; i <= 30; i++) {
            this.dayOfMonthOptions.push(i);
        }
        // get list of reports belonging to this user from the ToolC REST service
        // log the user out if the JWT is not valid
        this.reportService.getScheduledReports()
            .subscribe(function (reports) {
            _this.reports = reports;
            _this.dtTrigger.next();
            _this.reports = _this.parseReports(reports);
        }, function (error) {
            if (error.status == 403) {
                _this.userService.setInactiveStatus(true);
            }
            _this.router.navigate(['/login']);
        });
    };
    HomeComponent.prototype.parseReports = function (reports) {
        var _this = this;
        reports.forEach(function (report) {
            _this.parseReport(report);
        });
        return reports;
    };
    HomeComponent.prototype.parseReport = function (report) {
        if (report.filters) {
            report.parsedFilters = JSON.parse(report.filters);
        }
        else {
            report.parsedFilters = [];
        }
        return report;
    };
    HomeComponent.prototype.doSubmit = function (event) {
        var _this = this;
        this.updateCurrentReport();
        if (this.isAddReportForm) {
            console.log(this.currentReport.name);
            this.currentReport.index = 0;
            this.reportService
                .create('', this.currentReport)
                .subscribe(function (result) {
                _this.reports.unshift(_this.parseReport(result));
            });
        }
        else {
            this.reportService
                .update('', this.currentReport)
                .subscribe(function (result) {
                _this.reports[_this.currentReport.index] = _this.parseReport(result);
            });
        }
        this.initReportDetailForm();
        this.formDetailOpened = false;
    };
    HomeComponent.prototype.onClickCancel = function (event) {
        this.formDetailOpened = false;
    };
    HomeComponent.prototype.onClickAddReport = function (event) {
        this.currentReport = new __WEBPACK_IMPORTED_MODULE_4__models_scheduledreport__["a" /* ScheduledReport */]();
        this.formDetailOpened = true;
        this.isAddReportForm = true;
        this.updateReportDetailForm();
    };
    HomeComponent.prototype.onClickEdit = function (index) {
        this.formDetailOpened = true;
        this.isAddReportForm = false;
        this.currentReport = this.reports[index];
        this.currentReport.index = index;
        console.log(JSON.parse(this.currentReport.emails));
        this.updateReportDetailForm();
        this.hideShowScheduleDetail(this.reportDetailForm.value.scheduleType);
    };
    HomeComponent.prototype.onClickView = function (index) {
        console.log("Show preview for report: '" + this.reports[index].name + "'");
        window.open(this.reports[index].url, "_blank");
    };
    HomeComponent.prototype.onClickRemove = function (index) {
        var _this = this;
        if (window.confirm('Are sure you want to delete this item?')) {
            //console.log("Remove report: '" + this.reports[index].name + "'  (not yet implemented)");
            this.reportService
                .delete('', this.reports[index])
                .subscribe(function (result) {
                console.log("Removed report: '" + _this.reports[index].name + "'");
                if (result)
                    _this.reports.splice(index, 1);
            });
        }
    };
    HomeComponent.prototype.onScheduleChange = function (event) {
        if (event && event.target && event.target.value) {
            this.hideShowScheduleDetail(event.target.value);
        }
        else {
            this.hideShowScheduleDetail(this.reportDetailForm.value.scheduleType);
        }
    };
    HomeComponent.prototype.hideShowScheduleDetail = function (scheduleType) {
        if (scheduleType == "Weekly") {
            this.showDayOfWeek = true;
            this.showDayOfMonth = false;
        }
        else if (scheduleType == "Monthly") {
            this.showDayOfWeek = false;
            this.showDayOfMonth = true;
        }
        else {
            this.showDayOfWeek = false;
            this.showDayOfMonth = false;
        }
    };
    HomeComponent.prototype.initReportDetailForm = function () {
        this.reportDetailForm = this.fb.group({
            id: [""],
            name: ["", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].minLength(5)]],
            url: ["", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].minLength(5)]],
            format: ["PDF", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required],
            delivery: ["Email", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required],
            scheduleType: ["Daily", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required],
            dayOfWeek: ["Monday"],
            timeOfDay: ["0900"],
            dayOfMonth: [1],
            owner: this.fb.group({
                id: [""]
            }),
            emails: [""],
            filters: this.fb.array([this.initFilter('', '')])
        });
    };
    HomeComponent.prototype.initFilter = function (name, value) {
        return this.fb.group({
            name: name,
            value: value
        });
    };
    HomeComponent.prototype.initEmails = function (email) {
        return this.fb.group({
            email: email
        });
    };
    HomeComponent.prototype.onClickAddFilter = function () {
        var filters = this.reportDetailForm.get('filters');
        filters.push(this.initFilter('', ''));
    };
    HomeComponent.prototype.onClickRemoveFilter = function (index) {
        var filters = this.reportDetailForm.get('filters');
        filters.removeAt(index);
    };
    HomeComponent.prototype.updateReportDetailForm = function () {
        var _this = this;
        //Convert the JSONArray to a comma-delimited string
        var emailList = "";
        if (this.currentReport.emails) {
            emailList = JSON.parse(this.currentReport.emails)
                .map(function (email) { return email; })
                .join(', ');
        }
        this.reportDetailForm.patchValue({
            id: this.currentReport.id,
            name: this.currentReport.name,
            url: this.currentReport.url,
            format: this.currentReport.format,
            delivery: this.currentReport.delivery,
            scheduleType: this.currentReport.scheduleType,
            dayOfWeek: this.currentReport.dayOfWeek,
            dayOfMonth: this.currentReport.dayOfMonth,
            emails: emailList,
            owner: {
                id: this.currentReport.owner.id
            }
        });
        //Convert the JSONArray to a FormArray
        var filters = this.reportDetailForm.get('filters');
        filters = Object(__WEBPACK_IMPORTED_MODULE_8__services_utils__["a" /* clearFormArray */])(filters);
        if (this.currentReport.parsedFilters) {
            this.currentReport.parsedFilters.forEach(function (element) {
                filters.push(_this.initFilter(element.name, element.value));
            });
        }
    };
    HomeComponent.prototype.updateCurrentReport = function () {
        var _this = this;
        this.currentReport.id = this.reportDetailForm.value.id;
        this.currentReport.name = this.reportDetailForm.value.name;
        this.currentReport.url = this.reportDetailForm.value.url;
        this.currentReport.format = this.reportDetailForm.value.format;
        this.currentReport.delivery = this.reportDetailForm.value.delivery;
        this.currentReport.scheduleType = this.reportDetailForm.value.scheduleType;
        this.currentReport.dayOfWeek = this.reportDetailForm.value.dayOfWeek;
        this.currentReport.dayOfMonth = this.reportDetailForm.value.dayOfMonth;
        if (this.reportDetailForm.value.owner && this.currentReport.owner) {
            this.currentReport.owner.id = this.reportDetailForm.value.owner.id;
        }
        //Convert the comma-delimited string back to a JSONArray
        this.currentReport.emails = JSON.stringify(this.reportDetailForm.value.emails
            .replace(/,$/, "")
            .replace(" ", "")
            .split(","));
        //Convert the FormArray to a JSONArray of ScheduledReportFilter objects
        this.currentReport.parsedFilters = [];
        var filters = this.reportDetailForm.get('filters');
        filters.controls
            .forEach(function (element) {
            return _this.currentReport.parsedFilters.push(new __WEBPACK_IMPORTED_MODULE_5__models_reportfilter__["a" /* ReportFilter */](element.value.name, element.value.value));
        });
        this.currentReport.filters = JSON.stringify(this.currentReport.parsedFilters);
        console.log(this.currentReport);
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            moduleId: module.i,
            selector: 'dashboard',
            template: __webpack_require__("../../../../../src/app/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__services_scheduledreport_service__["a" /* ScheduledReportService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_7__services_user_service__["a" /* UserService */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "../../../../../src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6 col-md-offset-3\">\n   <!-- <div class=\"alert alert-info\">\n        Username: test<br />\n        Password: test\n    </div> -->\n    <h2>Login</h2>\n\n    <div *ngIf=\"isUserInactive\" class=\"mt-2, mb-2\">You have been logged out due to inactivity</div>\n\n    <form name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !username.valid }\">\n            <label for=\"username\">Username</label>\n            <input type=\"text\" class=\"form-control\" name=\"username\" [(ngModel)]=\"model.username\" #username=\"ngModel\" required />\n            <div *ngIf=\"f.submitted && !username.valid\" class=\"help-block\">Username is required</div>\n        </div>\n        <div class=\"form-group\" [ngClass]=\"{ 'has-error': f.submitted && !password.valid }\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" #password=\"ngModel\" required />\n            <div *ngIf=\"f.submitted && !password.valid\" class=\"help-block\">Password is required</div>\n        </div>\n        <div class=\"form-group\">\n            <button [disabled]=\"loading\" class=\"btn btn-primary\">Login</button>\n            <img *ngIf=\"loading\" [src]=\"loadingImage\" />\n        </div>\n        <div *ngIf=\"error\" class=\"alert alert-danger\">{{error}}</div>\n    </form>\n\n    <div style=\"font-size:80%;\">\n        <div>\n            <a href=\"#\"(click)=\"onClickForgotPassword($event)\">Forgot password?</a>\n            <img  *ngIf=\"resetPasswordLoading\" [src]=\"loadingImage\" />      \n        </div>\n        <div *ngIf=\"resetPasswordSuccess\" [class]=\"resetPasswordDivClass\">{{forgotUsernameText}}</div>\n    </div>\n\n    <div class=\"mt-4\" style=\"font-size:80%;\">\n        <div>\n            <a href=\"#\"(click)=\"onClickRegister($event)\">Register as new user</a>\n        </div>\n    </div>\n    \n</div>\n"

/***/ }),

/***/ "../../../../../src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__("../../../../../src/app/_services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_appsettings__ = __webpack_require__("../../../../../src/app/_services/appsettings.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(router, authenticationService, userService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.loadingImage = __WEBPACK_IMPORTED_MODULE_4__services_appsettings__["a" /* AppSettings */].LOADING_IMAGE;
        this.model = {};
        this.loading = false;
        this.resetPasswordLoading = false;
        this.resetPasswordSuccess = false;
        this.resetPasswordDivClass = "alert alert-danger";
        this.error = '';
        this.forgotUsernameText = "";
        this.model.username = "alteraa@yahoo.com";
        this.model.password = "password";
        this.userService.isUserInactive.subscribe(function (value) { return _this.isUserInactive = value; });
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.setLoggedInStatus(false);
        this.authenticationService.logout();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/']);
            }
            else {
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        }, function (err) {
            _this.error = 'Username or password is incorrect';
            _this.loading = false;
        });
    };
    LoginComponent.prototype.onClickForgotPassword = function (event) {
        var _this = this;
        this.resetPasswordSuccess = false;
        this.resetPasswordLoading = true;
        if (!this.model.username) {
            this.forgotUsernameText = "Your username is your email address.  Please enter it in the form above.";
        }
        else {
            this.authenticationService.forgotPassword(this.model.username)
                .subscribe(function (response) {
                _this.resetPasswordLoading = false;
                if (response) {
                    _this.resetPasswordSuccess = true;
                    _this.resetPasswordDivClass = "alert alert-success";
                    _this.forgotUsernameText = "A link to reset your password has been sent to your email address.";
                }
                else {
                    _this.resetPasswordSuccess = true;
                    _this.forgotUsernameText = "There was an error";
                }
            }, function (error) {
                _this.resetPasswordSuccess = true;
                _this.resetPasswordLoading = false;
                _this.forgotUsernameText = "There was an error";
            });
        }
        //Stop the link from opening in a new page
        event.preventDefault();
    };
    LoginComponent.prototype.onClickRegister = function (event) {
        this.router.navigate(['/register']);
        event.preventDefault();
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            moduleId: module.i,
            template: __webpack_require__("../../../../../src/app/login/login.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/register/register.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6 col-md-offset-3\"> \n  <div><h4>New User Registration</h4></div>\n    <div class=\"mt-4\">\n      <form [formGroup]=\"registrationForm\" (ngSubmit)=\"onClickSubmit()\">\n          <div class=\"form-group\">\n              <label for=\"newPassword\">Email Address</label>\n              <input type=\"text\" class=\"form-control\" id=\"email\" name=\"email\" formControlName=\"email\">\n              <div *ngIf=\"registrationForm.controls.email.dirty \n                    && registrationForm.controls.email.errors \n                    && !registrationForm.controls.email.errors.required\" class=\"alert alert-danger\">\n                  Please input a valid email.\n              </div>\n          </div>\n          <div class=\"form-group\">\n              <label for=\"newPassword\">New Password</label>\n              <input type=\"password\" class=\"form-control\" id=\"newPassword\" formControlName=\"newPassword\" />\n          </div>\n          <div class=\"form-group\">\n              <label for=\"confirmpassword\">Confirm Password</label>\n              <input type=\"password\" class=\"form-control\" id=\"confirmPassword\" formControlName=\"confirmPassword\" />\n          </div>\n          <div class=\"form-group\">\n              <button class=\"btn btn-primary\" [disabled]=\"!registrationForm.valid\">Submit</button>\n              <img *ngIf=\"loading\" [src]=\"loadingImage\" />  \n          </div>\n          <div class=\"alert alert-danger\" \n            *ngIf=\"!registrationForm.controls.newPassword.pristine && \n              !registrationForm.controls.confirmPassword.pristine \n              && registrationForm.controls.confirmPassword.errors?.MatchPassword\">\n            Passwords do not match\n          </div>\n      </form>\n    </div>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_passwordvalidation_service__ = __webpack_require__("../../../../../src/app/_services/passwordvalidation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_appsettings__ = __webpack_require__("../../../../../src/app/_services/appsettings.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegisterComponent = (function () {
    function RegisterComponent(activatedRoute, authenticationService, router, fb) {
        this.activatedRoute = activatedRoute;
        this.authenticationService = authenticationService;
        this.router = router;
        this.fb = fb;
        this.tokenValid = false;
        this.loading = false;
        this.loadingImage = __WEBPACK_IMPORTED_MODULE_5__services_appsettings__["a" /* AppSettings */].LOADING_IMAGE;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.tokenId = params['tokenid'];
            console.log(_this.tokenId);
        });
        if (this.tokenId) {
            this.authenticationService.validateToken(this.tokenId)
                .map(function (response) { return response.json(); })
                .subscribe(function (response) {
                console.log(response);
                _this.tokenValid = response.response;
                if (_this.tokenValid) {
                    window.alert("Your account is now active and you may log in");
                    _this.router.navigate(['/login']);
                }
            }, function (error) {
                console.log(error);
                _this.tokenValid = false;
            });
        }
        this.registrationForm = this.fb.group({
            email: ["", [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].email]],
            newPassword: ["", [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].minLength(5)]],
            confirmPassword: ["", __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* Validators */].minLength[5]]
        }, {
            validator: __WEBPACK_IMPORTED_MODULE_2__services_passwordvalidation_service__["a" /* PasswordValidation */].MatchPassword // your validation method
        });
    };
    RegisterComponent.prototype.onClickSubmit = function (event) {
        var _this = this;
        this.loading = true;
        this.authenticationService.register(this.registrationForm.value.email, this.registrationForm.value.newPassword)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) {
            _this.loading = false;
            window.alert("Thank you for registering! A link to verify your account has been sent to your email address.");
            _this.router.navigate(['/login']);
        }, function (error) {
            console.log(error);
        });
    };
    RegisterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-register',
            template: __webpack_require__("../../../../../src/app/register/register.component.html"),
            styles: [__webpack_require__("../../../../../src/app/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__["a" /* AuthenticationService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormBuilder */]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/resetpassword/resetpassword.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/resetpassword/resetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-6 col-md-offset-3\"> \n  <div *ngIf=\"tokenValid\">\n    <form [formGroup]=\"passwordResetForm\" (ngSubmit)=\"onClickSubmit()\">\n        <div class=\"form-group\">\n            <label for=\"newPassword\">New Password</label>\n            <input type=\"password\" class=\"form-control\" id=\"newPassword\" formControlName=\"newPassword\" />\n        </div>\n        <div class=\"form-group\">\n            <label for=\"confirmpassword\">Confirm Password</label>\n            <input type=\"password\" class=\"form-control\" id=\"confirmPassword\" formControlName=\"confirmPassword\" />\n        </div>\n        <div class=\"form-group\">\n            <button class=\"btn btn-primary\" [disabled]=\"!passwordResetForm.valid\">Submit</button>\n        </div>\n        <div class=\"alert alert-danger\" \n          *ngIf=\"!passwordResetForm.controls.newPassword.pristine && \n            !passwordResetForm.controls.confirmPassword.pristine \n            && passwordResetForm.controls.confirmPassword.errors?.MatchPassword\">\n          Passwords do not match\n        </div>\n    </form>\n  </div>\n\n  <div *ngIf=\"!tokenValid\" class=\"alert alert-danger\">\n    There was an error processing this request.\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/resetpassword/resetpassword.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetpasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_passwordvalidation_service__ = __webpack_require__("../../../../../src/app/_services/passwordvalidation.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authentication_service__ = __webpack_require__("../../../../../src/app/_services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetpasswordComponent = (function () {
    function ResetpasswordComponent(activatedRoute, authenticationService, router, fb) {
        this.activatedRoute = activatedRoute;
        this.authenticationService = authenticationService;
        this.router = router;
        this.fb = fb;
        this.model = {};
        this.loading = false;
        this.error = '';
        this.tokenValid = false;
    }
    ResetpasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscribe to router event
        this.activatedRoute.params.subscribe(function (params) {
            _this.tokenId = params['tokenid'];
        });
        this.authenticationService.validateToken(this.tokenId)
            .map(function (response) { return response.json(); })
            .subscribe(function (response) {
            console.log(response);
            _this.tokenValid = response.response;
        }, function (error) {
            console.log(error);
            _this.tokenValid = false;
        });
        this.passwordResetForm = this.fb.group({
            newPassword: ["", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].minLength(5)]],
            confirmPassword: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].minLength[5]]
        }, {
            validator: __WEBPACK_IMPORTED_MODULE_3__services_passwordvalidation_service__["a" /* PasswordValidation */].MatchPassword // your validation method
        });
    };
    ResetpasswordComponent.prototype.onClickSubmit = function () {
        var _this = this;
        if (this.tokenValid) {
            var validationObject = {
                id: this.tokenId,
                username: '',
                password: this.passwordResetForm.value.newPassword
            };
            this.authenticationService.validateUser(validationObject)
                .map(function (response) { return response.json(); })
                .subscribe(function (response) {
                if (response.response) {
                    window.alert("Your password has been changed");
                    _this.router.navigate(['/login']);
                }
                else {
                    _this.tokenValid = false;
                }
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.tokenValid = false;
        }
    };
    ResetpasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-resetpassword',
            template: __webpack_require__("../../../../../src/app/resetpassword/resetpassword.component.html"),
            styles: [__webpack_require__("../../../../../src/app/resetpassword/resetpassword.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_4__services_authentication_service__["a" /* AuthenticationService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */]])
    ], ResetpasswordComponent);
    return ResetpasswordComponent;
}());



/***/ }),

/***/ "../../../../../src/app/settings/settings.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/settings/settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"row ml-2 mb-4\">\n      <h2>Settings</h2>\n    </div>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/settings/settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SettingsComponent = (function () {
    function SettingsComponent() {
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    SettingsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-settings',
            template: __webpack_require__("../../../../../src/app/settings/settings.component.html"),
            styles: [__webpack_require__("../../../../../src/app/settings/settings.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* enableProdMode */])();
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