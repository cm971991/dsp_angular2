/**
 * Created by hale on 2016/11/14.
 */

import {Injectable} from "@angular/core";

@Injectable()
export class Logger {
    logs: string[] = [];

    log(message: string) {
        this.logs.push(message);

        console.log(message);
    }
}