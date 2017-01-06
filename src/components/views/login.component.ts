/**
 * Created by hale on 2016/11/14.
 */

import {
    Component, trigger, style,
    transition, animate, keyframes
} from '@angular/core';
import {Router} from '@angular/router';

import {loginForms} from '../../models/loginForms';

import {LoginService} from '../../services/login.service';
import {Logger} from '../../shared/logger';
import {HEncrypt} from '../../shared/hencrypt';

import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../assets/css/ui/login.css';

@Component({
    selector: 'dsp-login',
    templateUrl: '../htmls/login.html',
    animations: [
        trigger('animateType', [
            transition('inactive => active', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)'}),
                    style({opacity: 0, transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)'}),
                    style({opacity: 1, transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)'}),
                    style({opacity: 1, transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)'}),
                    style({opacity: 1, transform: 'perspective(400px)'}),
                ]))
            ]),
            transition('active => inactive', [
                animate(300, keyframes([
                    style({opacity: 0, transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)'}),
                    style({opacity: 0, transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)'}),
                    style({opacity: 1, transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)'}),
                    style({opacity: 1, transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)'}),
                    style({opacity: 1, transform: 'perspective(400px)'}),
                ]))
            ])
        ])
    ]
})

export class LoginComponent {

    constructor(private encry: HEncrypt,
                private loginService: LoginService,
                private logger: Logger,
                private router: Router) {
    }

    form: loginForms = {
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

    setSmsClass() {
        return {'display': this.form.clickFlag === 1 ? 'block' : 'none'}
    }

    setAccountClass() {
        return {'display': this.form.clickFlag === 2 ? 'block' : 'none'}
    }

    setSmsBtnClass() {
        return {'background-color': this.form.valid ? '#CFCFCF' : '#08A1EF'}
    }

    loginType(type: number): void {
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
    }

    // 发送验证码
    sendCode(): void {
        if (!this.isMob(this.form.phone))return;

        this.loginService.smsSend(this.form.phone)
            .then(
                result => {
                    this.form.errorMsg = result.msg;

                    if (result.ret) {
                        this.form.encryptSmsCode = result.sms;
                        this.form.valid = true;
                        this.form.btnSendCodeText = "60s";

                        let copyForms: loginForms = this.form;
                        let timer = setInterval(function () {
                            copyForms.sec--;
                            if (copyForms.sec == 0) {
                                clearInterval(timer);
                                copyForms.valid = false;
                                copyForms.btnSendCodeText = "发送验证码";
                                copyForms.sec = 60;
                            } else {
                                copyForms.btnSendCodeText = copyForms.sec + "s";
                            }
                        }, 1000);
                    }
                },
                error => this.form.errorMsg = "发送动态密码异常，请稍后重试");
        this.form.errorFlag = true;
    }

    // 短信登录
    smsLogin(): void {
        if (!this.isMob(this.form.phone))return;

        if (!this.isNull(this.form.smsCode, '验证码'))return;

        this.loginService.smsLogin(this.form.phone, this.form.smsCode, this.form.encryptSmsCode)
            .then(
                result => {
                    this.form.errorMsg = result.msg;

                    if (result.ret) {
                        localStorage.setItem('dspAdmin', this.encry.hEncrypt(JSON.stringify({
                            'login': this.form.phone,
                            'logName': result.content
                        })));
                        this.router.navigate(['/main']);
                    }
                },
                error => this.form.errorMsg = "信息异常，请联系管理员");
        this.form.errorFlag = true;
    }

    // 账号登录
    accountLogin(): void {
        if (!this.isNull(this.form.account, '账号'))return;

        if (!this.isNull(this.form.password, '密码'))return;

        this.loginService.accountLogin(this.form)
            .then(
                result => {
                    this.form.errorMsg = result.msg;

                    if (result.ret) {
                        localStorage.setItem('dspAdmin', this.encry.hEncrypt(JSON.stringify({
                            'login': this.form.account,
                            'logName': result.content
                        })));
                        this.router.navigate(['/main']);
                    }
                },
                error => this.form.errorMsg = "信息异常，请联系管理员");
        this.form.errorFlag = true;
    }

    isMob(mob: string): boolean {
        if (mob == "" || mob == undefined || mob == null) {
            this.form.errorMsg = "手机号码不能为空";
            this.form.errorFlag = true;
            return false;
        } else if (!mob.match(/^(((13[0-9]{1})|15[0-9]{1}|17[0-9]{1}|18[0-9]{1})+\d{8})$/)) {
            this.form.errorMsg = "手机号格式不正确";
            this.form.errorFlag = true;
            return false;
        } else {
            return true;
        }
    }

    isNull(s: string, name: string): boolean {
        if (s == "" || s == undefined || s == null || s.length <= 0) {
            this.form.errorMsg = name + "不能为空";
            this.form.errorFlag = true;
            return false;
        }
        return true;
    }

}
