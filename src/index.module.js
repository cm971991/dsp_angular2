/**
 * Created by hale on 2016/11/22.
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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
//service
var login_service_1 = require('./services/login.service');
var main_service_1 = require('./services/main.service');
var logger_1 = require('./shared/logger');
var hencrypt_1 = require('./shared/hencrypt');
// view
var index_component_1 = require('./components/views/index.component');
var login_component_1 = require('./components/views/login.component');
var main_component_1 = require('./components/views/main.component');
var root_routing_module_1 = require('./routes/root-routing.module');
//pipe
var menu_pipe_1 = require('./pipe/menu.pipe');
var IndexModule = (function () {
    function IndexModule() {
    }
    IndexModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                root_routing_module_1.RootRoutingModule
            ],
            providers: [
                logger_1.Logger,
                login_service_1.LoginService,
                main_service_1.MainService,
                hencrypt_1.HEncrypt
            ],
            declarations: [
                login_component_1.LoginComponent,
                index_component_1.IndexComponent,
                main_component_1.MainComponent,
                menu_pipe_1.MenuPipe,
                menu_pipe_1.ChildMenuPipe,
                menu_pipe_1.MenuNoChildPipe
            ],
            bootstrap: [index_component_1.IndexComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], IndexModule);
    return IndexModule;
}());
exports.IndexModule = IndexModule;
//# sourceMappingURL=index.module.js.map