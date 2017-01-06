/**
 * Created by hale on 2016/11/22.
 */

import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";

@Injectable()
export class HEncrypt {

    hEncrypt(val: string): string {
        if (isNullOrUndefined(val))return "";
        let c = String.fromCharCode(val.charCodeAt(0) + val.length);
        for (let i = 1; i < val.length; i++) {
            c += String.fromCharCode(val.charCodeAt(i) + val.charCodeAt(i - 1));
        }
        return (c);
    }

    hDecrypt(val: string): string {
        if (isNullOrUndefined(val))return "";
        let c = String.fromCharCode(val.charCodeAt(0) - val.length);
        for (let i = 1; i < val.length; i++) {
            c += String.fromCharCode(val.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        return c;
    }
}
