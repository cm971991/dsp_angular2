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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var login_service_1 = require('../../services/login.service');
var logger_1 = require('../../shared/logger');
var hencrypt_1 = require('../../shared/hencrypt');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../../assets/css/ui/login.css');
var LoginComponent = (function () {
    function LoginComponent(encry, loginService, logger, router) {
        this.encry = encry;
        this.loginService = loginService;
        this.logger = logger;
        this.router = router;
        this.form = {
            phone: "",
            smsCode: "",
            encryptSmsCode: "",
            account: "",
            password: "",
            errorMsg: "",
            errorFlag: false,
            clickFlag: 1,
            stateType: 'active',
            btnSendCodeText: "发送验证码",
            sec: 60,
            valid: false
        };
    }
    LoginComponent.prototype.setSmsClass = function () {
        return { 'display': this.form.clickFlag === 1 ? 'block' : 'none' };
    };
    LoginComponent.prototype.setAccountClass = function () {
        return { 'display': this.form.clickFlag === 2 ? 'block' : 'none' };
    };
    LoginComponent.prototype.setSmsBtnClass = function () {
        return { 'background-color': this.form.valid ? '#CFCFCF' : '#08A1EF' };
    };
    LoginComponent.prototype.loginType = function (type) {
        switch (type) {
            case 1:
                this.form.clickFlag = 1;
                this.form.stateType = 'active';
                break;
            case 2:
                this.form.clickFlag = 2;
                this.form.stateType = 'inactive';
                break;
        }
        this.form.errorMsg = '';
    };
    // 发送验证码
    LoginComponent.prototype.sendCode = function () {
        var _this = this;
        if (!this.isMob(this.form.phone))
            return;
        this.loginService.smsSend(this.form.phone)
            .then(function (result) {
            _this.form.errorMsg = result.msg;
            if (result.ret) {
                _this.form.encryptSmsCode = result.sms;
                _this.form.valid = true;
                _this.form.btnSendCodeText = "60s";
                var copyForms_1 = _this.form;
                var timer_1 = setInterval(function () {
                    copyForms_1.sec--;
                    if (copyForms_1.sec == 0) {
                        clearInterval(timer_1);
                        copyForms_1.valid = false;
                        copyForms_1.btnSendCodeText = "发送验证码";
                        copyForms_1.sec = 60;
                    }
                    else {
                        copyForms_1.btnSendCodeText = copyForms_1.sec + "s";
                    }
                }, 1000);
            }
        }, function (error) { return _this.form.errorMsg = "发送动态密码异常，请稍后重试"; });
        this.form.errorFlag = true;
    };
    // 短信登录
    LoginComponent.prototype.smsLogin = function () {
        var _this = this;
        if (!this.isMob(this.form.phone))
            return;
        if (!this.isNull(this.form.smsCode, '验证码'))
            return;
        this.loginService.smsLogin(this.form.phone, this.form.smsCode, this.form.encryptSmsCode)
            .then(function (result) {
            _this.form.errorMsg = result.msg;
            if (result.ret) {
                localStorage.setItem('dspAdmin', _this.encry.hEncrypt(JSON.stringify({
                    'login': _this.form.phone,
                    'logName': result.content
                })));
                _this.router.navigate(['/main']);
            }
        }, function (error) { return _this.form.errorMsg = "信息异常，请联系管理员"; });
        this.form.errorFlag = true;
    };
    // 账号登录
    LoginComponent.prototype.accountLogin = function () {
        var _this = this;
        if (!this.isNull(this.form.account, '账号'))
            return;
        if (!this.isNull(this.form.password, '密码'))
            return;
        this.loginService.accountLogin(this.form)
            .then(function (result) {
            _this.form.errorMsg = result.msg;
            if (result.ret) {
                localStorage.setItem('dspAdmin', _this.encry.hEncrypt(JSON.stringify({
                    'login': _this.form.account,
                    'logName': result.content
                })));
                _this.router.navigate(['/main']);
            }
        }, function (error) { return _this.form.errorMsg = "信息异常，请联系管理员"; });
        this.form.errorFlag = true;
    };
    LoginComponent.prototype.isMob = function (mob) {
        if (mob == "" || mob == undefined || mob == null) {
            this.form.errorMsg = "手机号码不能为空";
            this.form.errorFlag = true;
            return false;
        }
        else if (!mob.match(/^(((13[0-9]{1})|15[0-9]{1}|17[0-9]{1}|18[0-9]{1})+\d{8})$/)) {
            this.form.errorMsg = "手机号格式不正确";
            this.form.errorFlag = true;
            return false;
        }
        else {
            return true;
        }
    };
    LoginComponent.prototype.isNull = function (s, name) {
        if (s == "" || s == undefined || s == null || s.length <= 0) {
            this.form.errorMsg = name + "不能为空";
            this.form.errorFlag = true;
            return false;
        }
        return true;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'dsp-login',
            templateUrl: '../htmls/login.html',
            animations: [
                core_1.trigger('animateType', [
                    core_1.transition('inactive => active', [
                        core_1.animate(300, core_1.keyframes([
                            core_1.style({ opacity: 0, transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)' }),
                            core_1.style({ opacity: 0, transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)' }),
                            core_1.style({ opacity: 1, transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)' }),
                            core_1.style({ opacity: 1, transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)' }),
                            core_1.style({ opacity: 1, transform: 'perspective(400px)' }),
                        ]))
                    ]),
                    core_1.transition('active => inactive', [
                        core_1.animate(300, core_1.keyframes([
                            core_1.style({ opacity: 0, transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)' }),
                            core_1.style({ opacity: 0, transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)' }),
                            core_1.style({ opacity: 1, transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)' }),
                            core_1.style({ opacity: 1, transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)' }),
                            core_1.style({ opacity: 1, transform: 'perspective(400px)' }),
                        ]))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [hencrypt_1.HEncrypt, login_service_1.LoginService, logger_1.Logger, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map