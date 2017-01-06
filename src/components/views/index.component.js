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
var util_1 = require("util");
var hencrypt_1 = require('../../shared/hencrypt');
var IndexComponent = (function () {
    function IndexComponent(encry, router) {
        this.encry = encry;
        this.router = router;
    }
    IndexComponent.prototype.ngOnInit = function () {
        var naviateUrl = '/login';
        var ls = this.encry.hDecrypt(localStorage.getItem('dspAdmin'));
        var loginObj = ls === "" ? null : JSON.parse(ls);
        console.log("loginObj:", loginObj);
        if (!util_1.isNullOrUndefined(loginObj)) {
            naviateUrl = '/main';
        }
        this.router.navigate([naviateUrl]);
    };
    IndexComponent = __decorate([
        core_1.Component({
            selector: 'dsp-index',
            template: "<router-outlet></router-outlet>",
        }), 
        __metadata('design:paramtypes', [hencrypt_1.HEncrypt, router_1.Router])
    ], IndexComponent);
    return IndexComponent;
}());
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map