/**
 * Created by hale on 2016/11/14.
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
var http_1 = require('@angular/http');
var logger_1 = require('../shared/logger');
var LoginService = (function () {
    //本地环境
    // private apiUrl = 'http://10.10.133.213/agency/Api/Agency/Post?url=';
    // private smsSendUrl = this.apiUrl + 'http://localhost:57168/Api/LoginApi/SendSms';
    // private smsLoginUrl = this.apiUrl + 'http://localhost:57168/Api/LoginApi/SmsLogin';
    function LoginService(logger, http) {
        this.logger = logger;
        this.http = http;
        //线上环境
        // private apiUrl = 'http://110.52.11.105/agency/Api/Agency/Post';
        // private smsSendUrl = this.apiUrl + '?url=http://v.js165.com/iProbe/Api/LoginApi/SendSms';
        //线下环境
        this.apiUrl = 'http://10.10.141.102:9091/agency/Api/Agency/Post?url=';
        this.smsSendUrl = this.apiUrl + 'http://10.10.141.102:9091/Api/DSPApi/SendSms';
        this.smsLoginUrl = this.apiUrl + 'http://10.10.141.102:9091/Api/DSPApi/SmsLogin';
        this.accountLoginUrl = this.apiUrl + 'http://10.10.141.102:9091/Api/DSPApi/Login';
    }
    LoginService.prototype.smsSend = function (phone) {
        this.logger.log("smsSend:" + phone);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.smsSendUrl, { phone: phone }, options)
            .toPromise()
            .then(this.postCallBack)
            .catch(this.handleError);
    };
    LoginService.prototype.smsLogin = function (phone, validecode, validecodeSecond) {
        this.logger.log("smsLogin:" + phone);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.smsLoginUrl, { phone: phone, validecode: validecode, validecodeSecond: validecodeSecond }, options)
            .toPromise()
            .then(this.postCallBack)
            .catch(this.handleError);
    };
    LoginService.prototype.accountLogin = function (form) {
        this.logger.log("accountLogin:" + form.account);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var username = form.account;
        var password = form.password;
        return this.http.post(this.accountLoginUrl, { username: username, password: password }, options)
            .toPromise()
            .then(this.postCallBack)
            .catch(this.handleError);
    };
    LoginService.prototype.postCallBack = function (res) {
        var body = res.json();
        return body || {};
    };
    LoginService.prototype.handleError = function (error) {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [logger_1.Logger, http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map