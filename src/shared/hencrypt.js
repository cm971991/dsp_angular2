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
var core_1 = require("@angular/core");
var util_1 = require("util");
var HEncrypt = (function () {
    function HEncrypt() {
    }
    HEncrypt.prototype.hEncrypt = function (val) {
        if (util_1.isNullOrUndefined(val))
            return "";
        var c = String.fromCharCode(val.charCodeAt(0) + val.length);
        for (var i = 1; i < val.length; i++) {
            c += String.fromCharCode(val.charCodeAt(i) + val.charCodeAt(i - 1));
        }
        return (c);
    };
    HEncrypt.prototype.hDecrypt = function (val) {
        if (util_1.isNullOrUndefined(val))
            return "";
        var c = String.fromCharCode(val.charCodeAt(0) - val.length);
        for (var i = 1; i < val.length; i++) {
            c += String.fromCharCode(val.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        return c;
    };
    HEncrypt = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], HEncrypt);
    return HEncrypt;
}());
exports.HEncrypt = HEncrypt;
//# sourceMappingURL=hencrypt.js.map