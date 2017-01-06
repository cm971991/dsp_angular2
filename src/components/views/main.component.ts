/**
 * Created by hale on 2016/11/22.
 */

import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from "util";

import {MainService} from '../../services/main.service';
import {HEncrypt} from '../../shared/hencrypt';
import {Main} from '../../models/main';

import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import '../../assets/css/ui/index.css';


let common = require('../../config/common');

@Component({
    selector: 'dsp-index',
    templateUrl: '../htmls/main.html'
})

export class MainComponent implements OnInit {

    constructor(private encry: HEncrypt,
                private mainService: MainService) {
    }

    allMenuList: any[] = [];        //所有菜单
    menuList: any[] = [];           //父级菜单
    childMenuList: any[] = [];      //子集菜单（第一级）
    secChildMenuList: any[] = [];   //子集菜单（第二级）
    toggleMenuList: any[] = [];     //记录打开关闭菜单
    lastMenuId: string;

    model: Main = {
        logName: "",
        title: "",
        time: "",
        logOut: false,
        menuToggleFlag: false
    };

    ngOnInit() {
        let ls = this.encry.hDecrypt(localStorage.getItem('dspAdmin'));
        let loginObj = ls === "" ? null : JSON.parse(ls);
        if (!isNullOrUndefined(loginObj)) {
            this.model.logName = loginObj.logName;
            this.model.title = common.title;
        }

        this.mainService.getMenu(this.model.logName)
            .then(
                result => {
                    this.allMenuList = result.list;
                    this.menuList = this.allMenuList.filter((item: any) => item.ParentId === '0');
                    this.childMenuList = this.getMenu(2, true);
                    this.secChildMenuList = this.getMenu(3, false);
                }
            );
    }

    showLogOut() {
        this.model.logOut = true;
    }

    setLogOutClass() {
        return {'display': this.model.logOut ? 'block' : 'none'}
    }

    setMenuLiClass() {
        return {open: this.model.menuToggleFlag};
    }

    setMenuUlClass() {
        return {'display': this.model.menuToggleFlag ? 'block' : 'none'}
    }

    logOut() {

    }

    cancel() {
        this.model.logOut = false;
    }

    changeMenu(ModuleId: string, ParentId: string, isExecute: boolean, $event: Event) {
        $event.stopPropagation();//冒泡阻止
        if (isExecute) {
            for (let i = 0; i < this.toggleMenuList.length; i++) {
                if (this.toggleMenuList[i].Id == ModuleId) {
                    this.toggleMenuList[i].open = !this.toggleMenuList[i].open;

                    //两次点击菜单不一样 则把当前点击的菜单状态置为true
                    //记录本次点击的ModuleId到lastMenuId
                    if (this.lastMenuId != ModuleId) {
                        this.toggleMenuList[i].open = true;
                    }
                    this.lastMenuId = ModuleId;

                    if (ParentId == '0') {
                        let menu = document.querySelector("#menu" + ModuleId);
                        let ul = menu.querySelector('ul.b-children');

                        if (this.toggleMenuList[i].open) {
                            this.addClass(menu, "open");
                            this.removeClass(ul, 'hide');
                            this.addClass(ul, "show");

                            let siblingsLi = menu.parentElement.children;
                            for (let j = 0; j < siblingsLi.length; j++) {
                                if (!siblingsLi[j].isSameNode(menu)) {
                                    this.removeClass(siblingsLi[j], 'open');
                                    this.removeClass(siblingsLi[j].querySelector('ul.b-children'), 'show');
                                }
                            }
                            break;
                        } else {
                            this.removeClass(menu, "open");
                            this.removeClass(ul, "show");
                            break;
                        }
                    } else {
                        let menu = document.getElementById("menu" + ModuleId);
                        let ul = menu.querySelector('ul.b-children');

                        if (this.toggleMenuList[i].open) {
                            this.addClass(menu, "open");
                            this.removeClass(ul, 'hide');
                            this.addClass(ul, "show");

                            let siblingsLi = menu.parentElement.children;
                            for (let j = 0; j < siblingsLi.length; j++) {
                                if (!siblingsLi[j].isSameNode(menu)) {
                                    this.removeClass(siblingsLi[j], 'open');
                                    this.removeClass(siblingsLi[j].querySelector('ul.b-children'), 'show');
                                }
                            }
                            break;
                        } else {
                            this.removeClass(menu, "open");
                            this.removeClass(ul, "show");
                            break;
                        }
                    }
                }
            }
            this.model.menuToggleFlag = !this.model.menuToggleFlag;
        }
    }

    getMenu(deep: number, isFirst: boolean): any[] {
        let resultList: any[] = [];
        let fatherModule: string[] = ["0"];

        for (let deepCount = 1; deepCount <= deep; deepCount++) {
            for (let deepCount = 1; deepCount <= deep; deepCount++) {
                let childModule: string[] = [];
                for (let i = 0; i < this.allMenuList.length; i++) {
                    if (isFirst) {

                        this.toggleMenuList.push({
                            Id: this.allMenuList[i].ModuleId,
                            ParentId: this.allMenuList[i].ParentId,
                            open: false
                        });
                    }

                    let isDirectChild: boolean = false;
                    let parentIdOfCurrentModule: string = this.allMenuList[i].ParentId;

                    for (let j = 0; j < fatherModule.length; j++) {
                        if (fatherModule[j] == parentIdOfCurrentModule) {
                            isDirectChild = true;
                            break;
                        }
                    }

                    if (isDirectChild) {
                        childModule.push(this.allMenuList[i].ModuleId);
                    }
                }
                fatherModule = childModule;
            }

            let resultModule: string[] = fatherModule;

            for (let i = 0; i < resultModule.length; i++) {
                for (let j = 0; j < this.allMenuList.length; j++) {
                    if (this.allMenuList[j].ModuleId == resultModule[i]) {
                        resultList.push(this.allMenuList[j]);
                        break;
                    }
                }
            }
        }
        return resultList;
    }

    changeIcon(id: number) {
        let eleArrow = document.querySelectorAll('.arrow-left');
        let eleSolid = document.querySelectorAll('.solid');
        let eleDashed = document.querySelectorAll('.dashed');

        for (let i = 0; i < eleArrow.length; i++) {
            this.removeClass(eleArrow[i], 'show');
            this.addClass(eleArrow[i], 'hide');
        }
        for (let i = 0; i < eleSolid.length; i++) {
            this.removeClass(eleSolid[i], 'show');
            this.addClass(eleSolid[i], 'hide');
        }
        for (let i = 0; i < eleDashed.length; i++) {
            this.removeClass(eleDashed[i], 'hide');
            this.addClass(eleDashed[i], 'show');
        }

        this.removeClass(document.querySelector("#menu" + id + " .dashed"), 'show');
        this.addClass(document.querySelector("#menu" + id + " .dashed"), 'hide');

        this.removeClass(document.querySelector("#menu" + id + " .solid"), 'hide');
        this.addClass(document.querySelector("#menu" + id + " .solid"), 'show');

        this.removeClass(document.querySelector("#menu" + id + " .arrow-left"), 'hide');
        this.addClass(document.querySelector("#menu" + id + " .arrow-left"), 'show');
    }

    isBelowMenu(moduleId: string): number {
        let count = 0;
        for (let i = 0; i < this.allMenuList.length; i++) {
            if (this.allMenuList[i].ParentId == moduleId) {
                count++;
            }
        }
        return count;
    }

    addClass(obj: Element, cls: string): void {
        if (obj) {
            let obj_class = obj.className;
            let blank = (obj_class != '') ? ' ' : '';
            let added = obj_class + blank + cls;
            obj.className = added;
        }
    }

    removeClass(obj: Element, cls: string): void {
        if (obj) {
            let obj_class = ' ' + obj.className + ' ';
            obj_class = obj_class.replace(/(\s+)/gi, ' ');
            let removed = obj_class.replace(' ' + cls + ' ', ' ');
            removed = removed.replace(/(^\s+)|(\s+$)/g, '');
            obj.className = removed;
        }
    }

    hasClass(obj: Element, cls: string): boolean {
        if (obj) {
            let obj_class = obj.className;
            let obj_class_lst = obj_class.split(/\s+/);
            for (let x in obj_class_lst) {
                if (obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
                    return true;
                }
            }
        }
        return false;
    }
}
