/**
 * Created by hale on 2016/11/21.
 */

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {isNullOrUndefined} from "util";

import {HEncrypt} from '../../shared/hencrypt';

@Component({
    selector: 'dsp-index',
    template: `<router-outlet></router-outlet>`,
})

export class IndexComponent implements OnInit {

    constructor(private encry: HEncrypt,
                private router: Router) {
    }

    ngOnInit(): void {
        let naviateUrl = '/login';

        let ls = this.encry.hDecrypt(localStorage.getItem('dspAdmin'));
        let loginObj = ls === "" ? null : JSON.parse(ls);

        console.log("loginObj:", loginObj);

        if (!isNullOrUndefined(loginObj)) {
            naviateUrl = '/main';
        }

        this.router.navigate([naviateUrl]);
    }
}