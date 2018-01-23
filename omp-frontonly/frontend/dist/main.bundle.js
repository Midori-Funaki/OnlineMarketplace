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

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var auth_guard_service_1 = __webpack_require__("../../../../../src/app/services/auth-guard.service.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/components/login/login.component.ts");
var signup_component_1 = __webpack_require__("../../../../../src/app/components/signup/signup.component.ts");
var facebook_component_1 = __webpack_require__("../../../../../src/app/components/facebook/facebook.component.ts");
var main_component_1 = __webpack_require__("../../../../../src/app/components/main/main.component.ts");
var google_component_1 = __webpack_require__("../../../../../src/app/components/google/google.component.ts");
var routes = [
    { path: '', component: login_component_1.LoginComponent },
    { path: 'auth/facebook/callback', component: facebook_component_1.FacebookComponent },
    { path: 'auth/google/callback', component: google_component_1.GoogleComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'main', component: main_component_1.MainComponent, canActivate: [auth_guard_service_1.AuthGuard] },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.routingComponents = [login_component_1.LoginComponent,
    signup_component_1.SignupComponent,
    facebook_component_1.FacebookComponent,
    main_component_1.MainComponent,
    google_component_1.GoogleComponent];


/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n\n<!-- nav bar area -->\n<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">App Site Title Here</a>\n    </div>\n    <ul class=\"nav navbar-nav\">\n      <li *ngIf=\"isLoggedIn\"><a href=\"#\" (click)=\"logOut($event)\">Logout</a></li>\n      <!--<li class=\"active\"><a href=\"#\">Home</a></li>\n      <li><a href=\"#\">Page 1</a></li>\n      <li><a href=\"#\">Page 2</a></li>\n      <li><a href=\"#\">Page 3</a></li>-->\n    </ul>\n  </div>\n</nav>\n<!-- End nav bar area -->\n\n<!-- main body area -->\n<div class=\"container\">\n  <router-outlet>\n  </router-outlet>\n</div>\n<!-- End main body area -->\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var AppComponent = (function () {
    function AppComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.isLoggedIn = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.isLoggedInNow().subscribe(function (res) {
            _this.isLoggedIn = res;
        });
    };
    AppComponent.prototype.logOut = function () {
        this.authService.logOut();
        this.router.navigate(['/login']);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
//Routing imports
var app_routing_module_1 = __webpack_require__("../../../../../src/app/app-routing.module.ts");
//Component imports
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var app_routing_module_2 = __webpack_require__("../../../../../src/app/app-routing.module.ts");
//Service imports
var facebook_auth_service_1 = __webpack_require__("../../../../../src/app/services/facebook-auth.service.ts");
var auth_service_1 = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var oauth_service_1 = __webpack_require__("../../../../angular2-oauth2/oauth-service.js");
var auth_guard_service_1 = __webpack_require__("../../../../../src/app/services/auth-guard.service.ts");
var google_auth_service_1 = __webpack_require__("../../../../../src/app/services/google-auth.service.ts");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                app_routing_module_2.routingComponents,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpModule
            ],
            providers: [
                facebook_auth_service_1.FacebookAuthService,
                auth_service_1.AuthService,
                oauth_service_1.OAuthService,
                auth_guard_service_1.AuthGuard,
                google_auth_service_1.GoogleAuthService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "../../../../../src/app/components/facebook/facebook.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/facebook/facebook.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  facebook works! now logging into API\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/facebook/facebook.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var router_2 = __webpack_require__("../../../router/esm5/router.js");
var query_string_1 = __webpack_require__("../../../../query-string/index.js");
var FacebookComponent = (function () {
    function FacebookComponent(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
    }
    FacebookComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/main']);
        }
        this.route.fragment.subscribe(function (fragment) {
            _this.authService.facebookLogin(query_string_1.parse(fragment).access_token);
        });
    };
    FacebookComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("../../../../../src/app/components/facebook/facebook.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/facebook/facebook.component.css")]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router,
            router_2.ActivatedRoute])
    ], FacebookComponent);
    return FacebookComponent;
}());
exports.FacebookComponent = FacebookComponent;


/***/ }),

/***/ "../../../../../src/app/components/google/google.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/google/google.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  google OAuth works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/components/google/google.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var router_2 = __webpack_require__("../../../router/esm5/router.js");
var query_string_1 = __webpack_require__("../../../../query-string/index.js");
var GoogleComponent = (function () {
    function GoogleComponent(authService, router, route) {
        this.authService = authService;
        this.router = router;
        this.route = route;
    }
    GoogleComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.authService.isAuthenticated()) {
            console.log('Google navigation');
            this.router.navigate(['/main']);
        }
        this.route.fragment.subscribe(function (fragment) {
            _this.authService.googleLogin(query_string_1.parse(fragment).access_token);
        });
    };
    GoogleComponent = __decorate([
        core_1.Component({
            selector: 'app-google',
            template: __webpack_require__("../../../../../src/app/components/google/google.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/google/google.component.css")]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router,
            router_2.ActivatedRoute])
    ], GoogleComponent);
    return GoogleComponent;
}());
exports.GoogleComponent = GoogleComponent;


/***/ }),

/***/ "../../../../../src/app/components/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#loginform{\r\n    padding: 50px 30px;\r\n    height: 500px;\r\n    margin-top: 50px;\r\n    width: 100%;\r\n    border: solid 1px grey;\r\n    border-radius: 10px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 \">\r\n    <div id=\"loginform\">\r\n        <h2>Login</h2>\r\n        <form [formGroup]=\"localLogin\" (ngSubmit)=\"onSubmit($event)\">\r\n            <div class=\"modal-body\">\r\n                <div class=\"form-group\">\r\n                <label>Username</label>\r\n                <input type='text' name=\"username\" class=\"form-control\" placeholder=\"Username\" \r\n                    formControlName=\"username\"/>\r\n\r\n                <div *ngIf=\"localLogin.controls['username'].hasError('required') && localLogin.controls['username'].dirty\" class=\"alert alert-danger\">\r\n                    Password should be no less than 1 letter\r\n                </div>\r\n                <div *ngIf=\"localLogin.controls['username'].hasError('maxlength') && localLogin.controls['username'].dirty\" class=\"alert alert-danger\">\r\n                    Password should be no more than 25 letters\r\n                </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                <label>password</label>\r\n                <input type='text' name=\"password\" class=\"form-control\" placeholder=\"Enter your password\" \r\n                    formControlName=\"password\"/>\r\n                <div *ngIf=\"localLogin.controls['password'].hasError('required') && localLogin.controls['password'].dirty\" class=\"alert alert-danger\">\r\n                    Password is required\r\n                </div>\r\n                </div>\r\n            </div>\r\n            <div id=\"btn-box\">\r\n                <input type=\"submit\" class=\"btn btn-primary\" id=\"link-submit-btn\" value=\"Submit\"/>\r\n            </div>\r\n        </form> \r\n        <a routerLink=\"/signup\" routerLinkActive=\"active\">Signup for an account</a>\r\n        <hr>\r\n        <button class=\"btn btn-pirmary\" (click)=\"onLoginWithFacebook($event)\">Login with Facebook</button>\r\n        <button class=\"btn btn-pirmary\" (click)=\"onLoginWithGoogle($event)\">Login with Google</button>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var facebook_auth_service_1 = __webpack_require__("../../../../../src/app/services/facebook-auth.service.ts");
var google_auth_service_1 = __webpack_require__("../../../../../src/app/services/google-auth.service.ts");
var LoginComponent = (function () {
    function LoginComponent(formBuilder, authService, facebookAuthService, googleAuthService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.facebookAuthService = facebookAuthService;
        this.googleAuthService = googleAuthService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.localLogin = this.formBuilder.group({
            username: ["", [forms_1.Validators.required, forms_1.Validators.maxLength(25)]],
            password: ["", forms_1.Validators.required]
        });
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['main']);
        }
    };
    LoginComponent.prototype.onSubmit = function (e) {
        e.preventDefault();
        //console.log(this.localLogin.value);
        if (this.localLogin.valid && this.localLogin.dirty) {
            this.authService.logIn(this.localLogin.value.username, this.localLogin.value.password);
        }
    };
    LoginComponent.prototype.onLoginWithFacebook = function (event) {
        this.facebookAuthService.logIn();
    };
    LoginComponent.prototype.onLoginWithGoogle = function (event) {
        this.googleAuthService.logIn();
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/components/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            auth_service_1.AuthService,
            facebook_auth_service_1.FacebookAuthService,
            google_auth_service_1.GoogleAuthService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "../../../../../src/app/components/main/main.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/main/main.component.html":
/***/ (function(module, exports) {

module.exports = "<div> This is the main component"

/***/ }),

/***/ "../../../../../src/app/components/main/main.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var MainComponent = (function () {
    function MainComponent() {
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'app-main',
            template: __webpack_require__("../../../../../src/app/components/main/main.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;


/***/ }),

/***/ "../../../../../src/app/components/signup/signup.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#signupform{\r\n    padding: 50px 30px;\r\n    height: 500px;\r\n    margin-top: 50px;\r\n    width: 100%;\r\n    border: solid 1px grey;\r\n    border-radius: 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/signup/signup.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 \">\n  <div id=\"signupform\">\n      <h2>Signup</h2>\n      <form [formGroup]=\"localSignup\" (ngSubmit)=\"onSubmit($event)\">\n          <div class=\"modal-body\">\n              <div class=\"form-group\">\n                <label>Username</label>\n                <input type='text' name=\"username\" class=\"form-control\" placeholder=\"Username\" \n                    formControlName=\"username\"/>\n\n                <div *ngIf=\"localSignup.controls['username'].hasError('required') && localSignup.controls['username'].dirty\" class=\"alert alert-danger\">\n                    Password should be no less than 1 letter\n                </div>\n                <div *ngIf=\"localSignup.controls['username'].hasError('maxlength') && localSignup.controls['username'].dirty\" class=\"alert alert-danger\">\n                    Password should be no more than 25 letters\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label>Email</label>\n                <input type='text' name=\"email\" class=\"form-control\" placeholder=\"Enter your email\" \n                    formControlName=\"email\"/>\n                <div *ngIf=\"localSignup.controls['email'].hasError('required') && localSignup.controls['email'].dirty\" class=\"alert alert-danger\">\n                    Email is required\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label>password</label>\n                <input type='text' name=\"password\" class=\"form-control\" placeholder=\"Enter your password\" \n                    formControlName=\"password\"/>\n                <div *ngIf=\"localSignup.controls['password'].hasError('required') && localSignup.controls['password'].dirty\" class=\"alert alert-danger\">\n                    Password is required\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label>Confirm password</label>\n                <input type='text' name=\"passwordCheck\" class=\"form-control\" placeholder=\"Confirm password\" \n                    formControlName=\"passwordCheck\"/>\n                <div *ngIf=\"localSignup.controls['passwordCheck'].hasError('MatchPassword') && localSignup.controls['passwordCheck'].dirty\" class=\"alert alert-danger\">\n                    Password does not match\n                </div>\n              </div>\n          </div>\n          <div id=\"btn-box\">\n              <input type=\"submit\" class=\"btn btn-primary\" id=\"link-submit-btn\" value=\"Submit\"/>\n          </div>\n      </form>\n      <a routerLink=\"/login\" routerLinkActive=\"active\">back to Login</a>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/signup/signup.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var forms_1 = __webpack_require__("../../../forms/esm5/forms.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var password_validation_1 = __webpack_require__("../../../../../src/app/shared/password-validation.ts");
var SignupComponent = (function () {
    function SignupComponent(formBuilder, authService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.localSignup = this.formBuilder.group({
            username: ["", [forms_1.Validators.required, forms_1.Validators.maxLength(25)]],
            email: ["", forms_1.Validators.required],
            password: ["", forms_1.Validators.required],
            passwordCheck: ["", [forms_1.Validators.required]]
        }, { validator: password_validation_1.PasswordValidation.MatchPassword });
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['main']);
        }
    };
    SignupComponent.prototype.onSubmit = function (e) {
        e.preventDefault();
        console.log(this.localSignup.value);
        if (this.localSignup.valid && this.localSignup.dirty) {
            console.log("Yeah submitting form!");
            this.router.navigate(['login']);
        }
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            template: __webpack_require__("../../../../../src/app/components/signup/signup.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/signup/signup.component.css")]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            auth_service_1.AuthService,
            router_1.Router])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;


/***/ }),

/***/ "../../../../../src/app/services/auth-guard.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var auth_service_1 = __webpack_require__("../../../../../src/app/services/auth.service.ts");
var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
        }
        return this.authService.isAuthenticated();
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ "../../../../../src/app/services/auth.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var http_1 = __webpack_require__("../../../http/esm5/http.js");
var Subject_1 = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var AuthService = (function () {
    function AuthService(router, http) {
        this.router = router;
        this.http = http;
        this.token = null;
        this.isLoggedIn = false;
        this.isLoggedIn_sub = new Subject_1.Subject();
        try {
            this.token = localStorage.getItem('myToken');
            this.isLoggedIn = (this.token != null);
            this.isLoggedIn_sub.next(this.isLoggedIn);
        }
        catch (err) {
            console.log(err);
        }
    }
    AuthService.prototype.logIn = function (username, password) {
        var _this = this;
        return this.http.post('/api/login', { username: username, password: password }).subscribe(function (res) {
            _this.token = res.json().token;
            localStorage.setItem('myToken', _this.token);
            _this.router.navigate(['/main']);
        }, function (err) {
            alert("Log In Failed!");
        });
    };
    AuthService.prototype.facebookLogin = function (access_token) {
        var _this = this;
        return this.http.post('/api/login/facebook', { access_token: access_token }).subscribe(function (res) {
            _this.token = res.json().token;
            localStorage.setItem('myToken', _this.token);
            _this.router.navigate(['/main']);
        }, function (err) {
            alert("Log In Failed!");
        });
    };
    AuthService.prototype.googleLogin = function (access_token) {
        var _this = this;
        return this.http.post('/api/login/google', { access_token: access_token }).subscribe(function (res) {
            _this.token = res.json().token;
            localStorage.setItem('myToken', _this.token);
            _this.router.navigate(['/main']);
        }, function (err) {
            alert("Log In Failed!");
        });
    };
    AuthService.prototype.isAuthenticated = function () {
        this.isLoggedIn = (this.token != null);
        this.isLoggedIn_sub.next(this.isLoggedIn);
        return this.token != null;
    };
    AuthService.prototype.isLoggedInNow = function () {
        return this.isLoggedIn_sub.asObservable();
    };
    AuthService.prototype.logOut = function () {
        this.token = null;
        this.isLoggedIn = false;
        localStorage.removeItem('myToken');
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;


/***/ }),

/***/ "../../../../../src/app/services/facebook-auth.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var oauth_service_1 = __webpack_require__("../../../../angular2-oauth2/oauth-service.js");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
var FacebookAuthService = (function () {
    function FacebookAuthService(router) {
        this.router = router;
        this.oauthService = new oauth_service_1.OAuthService();
        this.oauthService.loginUrl = "https://www.facebook.com/v2.11/dialog/oauth";
        this.oauthService.redirectUri = window.location.origin + "/auth/facebook/callback";
        this.oauthService.clientId = environment_1.environment.facebookAppId;
        this.oauthService.scope = "email";
        this.oauthService.setStorage(localStorage);
    }
    FacebookAuthService.prototype.logIn = function () {
        this.oauthService.initImplicitFlow();
    };
    FacebookAuthService.prototype.logOut = function () {
        this.oauthService.logOut();
    };
    FacebookAuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], FacebookAuthService);
    return FacebookAuthService;
}());
exports.FacebookAuthService = FacebookAuthService;


/***/ }),

/***/ "../../../../../src/app/services/google-auth.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var router_1 = __webpack_require__("../../../router/esm5/router.js");
var oauth_service_1 = __webpack_require__("../../../../angular2-oauth2/oauth-service.js");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
var GoogleAuthService = (function () {
    function GoogleAuthService(router) {
        this.router = router;
        this.oauthService = new oauth_service_1.OAuthService();
        this.oauthService.loginUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        this.oauthService.redirectUri = window.location.origin + "/auth/google/callback";
        this.oauthService.clientId = environment_1.environment.googleAppId;
        this.oauthService.scope = "email profile";
        this.oauthService.setStorage(localStorage);
    }
    GoogleAuthService.prototype.logIn = function () {
        this.oauthService.initImplicitFlow();
    };
    GoogleAuthService.prototype.logOut = function () {
        this.oauthService.logOut();
    };
    GoogleAuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], GoogleAuthService);
    return GoogleAuthService;
}());
exports.GoogleAuthService = GoogleAuthService;


/***/ }),

/***/ "../../../../../src/app/shared/password-validation.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PasswordValidation = (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var passwordCheck = AC.get('passwordCheck').value; // to get value in input tag
        if (password != passwordCheck) {
            //console.log('false');
            AC.get('passwordCheck').setErrors({ MatchPassword: true });
        }
        else {
            //console.log('true');
            return null;
        }
    };
    return PasswordValidation;
}());
exports.PasswordValidation = PasswordValidation;


/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false,
    //Put your facebook App ID below
    facebookAppId: "156841828428687",
    googleAppId: "881529039427-tgg1b372td7mlu6tst3n0toha4h4m83v.apps.googleusercontent.com"
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map