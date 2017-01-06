/**
 * Created by hale on 2016/11/23.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {Logger} from '../shared/logger';

@Injectable()
export class MainService {

    //线上环境
    // private apiUrl = 'http://110.52.11.105/agency/Api/Agency/Post';

    //线下环境
    private apiUrl = 'http://10.10.141.102:9091/agency/Api/Agency/Post?url=';
    private initDataUrl = this.apiUrl + 'http://10.10.141.102:9091/Api/DSPApi/GetMenu';

    //本地环境
    // private apiUrl = 'http://10.10.133.213/agency/Api/Agency/Post?url=';

    constructor(private logger: Logger, private http: Http) {
    }

    getMenu(logName: string): Promise<any> {
        this.logger.log("getInitData:");

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.initDataUrl, {logName}, options)
            .toPromise()
            .then(this.postCallBack)
            .catch(this.handleError);
    }

    private postCallBack(res: Response) {
        let body = res.json();

        console.log("body:", body);
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
