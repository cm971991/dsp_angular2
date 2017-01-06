/**
 * Created by hale on 2016/11/14.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {loginForms} from '../models/loginForms';
import {Logger} from '../shared/logger';

@Injectable()
export class LoginService {

    //线上环境
    // private apiUrl = 'http://110.52.11.105/agency/Api/Agency/Post';
    // private smsSendUrl = this.apiUrl + '?url=http://v.js165.com/iProbe/Api/LoginApi/SendSms';

    //线下环境
    private apiUrl = 'http://10.10.141.102:9091/agency/Api/Agency/Post?url=';
    private smsSendUrl = this.apiUrl + 'http://10.10.141.102:9091/Api/DSPApi/SendSms';
    private smsLoginUrl = this.apiUrl + 'http://10.10.141.102:9091/Api/DSPApi/SmsLogin';
    private accountLoginUrl = this.apiUrl + 'http://10.10.141.102:9091/Api/DSPApi/Login';

    //本地环境
    // private apiUrl = 'http://10.10.133.213/agency/Api/Agency/Post?url=';
    // private smsSendUrl = this.apiUrl + 'http://localhost:57168/Api/LoginApi/SendSms';
    // private smsLoginUrl = this.apiUrl + 'http://localhost:57168/Api/LoginApi/SmsLogin';

    constructor(private logger: Logger, private http: Http) {
    }

    smsSend(phone: string): Promise<any> {
        this.logger.log("smsSend:" + phone);

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.smsSendUrl, {phone}, options)
            .toPromise()
            .then(this.postCallBack)
            .catch(this.handleError);
    }

    smsLogin(phone: string, validecode: string, validecodeSecond: string): Promise<any> {
        this.logger.log("smsLogin:" + phone);

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.smsLoginUrl, {phone, validecode, validecodeSecond}, options)
            .toPromise()
            .then(this.postCallBack)
            .catch(this.handleError);
    }

    accountLogin(form: loginForms): Promise<any> {
        this.logger.log("accountLogin:" + form.account);

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let username = form.account;
        let password = form.password;

        return this.http.post(this.accountLoginUrl, {username, password}, options)
            .toPromise()
            .then(this.postCallBack)
            .catch(this.handleError);
    }

    private postCallBack(res: Response) {
        let body = res.json();

        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
