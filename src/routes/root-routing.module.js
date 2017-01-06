/**
 * Created by hale on 2016/11/21.
 */
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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_component_1 = require('../components/views/login.component');
var index_component_1 = require('../components/views/index.component');
var main_component_1 = require('../components/views/main.component');
var routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'index', component: index_component_1.IndexComponent },
    { path: 'main', component: main_component_1.MainComponent }
];
var RootRoutingModule = (function () {
    function RootRoutingModule() {
    }
    RootRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], RootRoutingModule);
    return RootRoutingModule;
}());
exports.RootRoutingModule = RootRoutingModule;
//# sourceMappingURL=root-routing.module.js.map