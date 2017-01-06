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
var core_1 = require('@angular/core');
var util_1 = require("util");
var main_service_1 = require('../../services/main.service');
var hencrypt_1 = require('../../shared/hencrypt');
require('../../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../../../node_modules/font-awesome/css/font-awesome.css');
require('../../assets/css/ui/index.css');
var common = require('../../config/common');
var MainComponent = (function () {
    function MainComponent(encry, mainService) {
        this.encry = encry;
        this.mainService = mainService;
        this.allMenuList = []; //所有菜单
        this.menuList = []; //父级菜单
        this.childMenuList = []; //子集菜单（第一级）
        this.secChildMenuList = []; //子集菜单（第二级）
        this.toggleMenuList = []; //记录打开关闭菜单
        this.model = {
            logName: "",
            title: "",
            time: "",
            logOut: false,
            menuToggleFlag: false
        };
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        var ls = this.encry.hDecrypt(localStorage.getItem('dspAdmin'));
        var loginObj = ls === "" ? null : JSON.parse(ls);
        if (!util_1.isNullOrUndefined(loginObj)) {
            this.model.logName = loginObj.logName;
            this.model.title = common.title;
        }
        this.mainService.getMenu(this.model.logName)
            .then(function (result) {
            _this.allMenuList = result.list;
            _this.menuList = _this.allMenuList.filter(function (item) { return item.ParentId === '0'; });
            _this.childMenuList = _this.getMenu(2, true);
            _this.secChildMenuList = _this.getMenu(3, false);
        });
    };
    MainComponent.prototype.showLogOut = function () {
        this.model.logOut = true;
    };
    MainComponent.prototype.setLogOutClass = function () {
        return { 'display': this.model.logOut ? 'block' : 'none' };
    };
    MainComponent.prototype.setMenuLiClass = function () {
        return { open: this.model.menuToggleFlag };
    };
    MainComponent.prototype.setMenuUlClass = function () {
        return { 'display': this.model.menuToggleFlag ? 'block' : 'none' };
    };
    MainComponent.prototype.logOut = function () {
    };
    MainComponent.prototype.cancel = function () {
        this.model.logOut = false;
    };
    MainComponent.prototype.changeMenu = function (ModuleId, ParentId, isExecute, $event) {
        $event.stopPropagation(); //冒泡阻止
        if (isExecute) {
            for (var i = 0; i < this.toggleMenuList.length; i++) {
                if (this.toggleMenuList[i].Id == ModuleId) {
                    this.toggleMenuList[i].open = !this.toggleMenuList[i].open;
                    //两次点击菜单不一样 则把当前点击的菜单状态置为true
                    //记录本次点击的ModuleId到lastMenuId
                    if (this.lastMenuId != ModuleId) {
                        this.toggleMenuList[i].open = true;
                    }
                    this.lastMenuId = ModuleId;
                    if (ParentId == '0') {
                        var menu = document.querySelector("#menu" + ModuleId);
                        var ul = menu.querySelector('ul.b-children');
                        if (this.toggleMenuList[i].open) {
                            this.addClass(menu, "open");
                            this.removeClass(ul, 'hide');
                            this.addClass(ul, "show");
                            var siblingsLi = menu.parentElement.children;
                            for (var j = 0; j < siblingsLi.length; j++) {
                                if (!siblingsLi[j].isSameNode(menu)) {
                                    this.removeClass(siblingsLi[j], 'open');
                                    this.removeClass(siblingsLi[j].querySelector('ul.b-children'), 'show');
                                }
                            }
                            break;
                        }
                        else {
                            this.removeClass(menu, "open");
                            this.removeClass(ul, "show");
                            break;
                        }
                    }
                    else {
                        var menu = document.getElementById("menu" + ModuleId);
                        var ul = menu.querySelector('ul.b-children');
                        if (this.toggleMenuList[i].open) {
                            this.addClass(menu, "open");
                            this.removeClass(ul, 'hide');
                            this.addClass(ul, "show");
                            var siblingsLi = menu.parentElement.children;
                            for (var j = 0; j < siblingsLi.length; j++) {
                                if (!siblingsLi[j].isSameNode(menu)) {
                                    this.removeClass(siblingsLi[j], 'open');
                                    this.removeClass(siblingsLi[j].querySelector('ul.b-children'), 'show');
                                }
                            }
                            break;
                        }
                        else {
                            this.removeClass(menu, "open");
                            this.removeClass(ul, "show");
                            break;
                        }
                    }
                }
            }
            this.model.menuToggleFlag = !this.model.menuToggleFlag;
        }
    };
    MainComponent.prototype.getMenu = function (deep, isFirst) {
        var resultList = [];
        var fatherModule = ["0"];
        for (var deepCount = 1; deepCount <= deep; deepCount++) {
            for (var deepCount_1 = 1; deepCount_1 <= deep; deepCount_1++) {
                var childModule = [];
                for (var i = 0; i < this.allMenuList.length; i++) {
                    if (isFirst) {
                        this.toggleMenuList.push({
                            Id: this.allMenuList[i].ModuleId,
                            ParentId: this.allMenuList[i].ParentId,
                            open: false
                        });
                    }
                    var isDirectChild = false;
                    var parentIdOfCurrentModule = this.allMenuList[i].ParentId;
                    for (var j = 0; j < fatherModule.length; j++) {
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
            var resultModule = fatherModule;
            for (var i = 0; i < resultModule.length; i++) {
                for (var j = 0; j < this.allMenuList.length; j++) {
                    if (this.allMenuList[j].ModuleId == resultModule[i]) {
                        resultList.push(this.allMenuList[j]);
                        break;
                    }
                }
            }
        }
        return resultList;
    };
    MainComponent.prototype.changeIcon = function (id) {
        var eleArrow = document.querySelectorAll('.arrow-left');
        var eleSolid = document.querySelectorAll('.solid');
        var eleDashed = document.querySelectorAll('.dashed');
        for (var i = 0; i < eleArrow.length; i++) {
            this.removeClass(eleArrow[i], 'show');
            this.addClass(eleArrow[i], 'hide');
        }
        for (var i = 0; i < eleSolid.length; i++) {
            this.removeClass(eleSolid[i], 'show');
            this.addClass(eleSolid[i], 'hide');
        }
        for (var i = 0; i < eleDashed.length; i++) {
            this.removeClass(eleDashed[i], 'hide');
            this.addClass(eleDashed[i], 'show');
        }
        this.removeClass(document.querySelector("#menu" + id + " .dashed"), 'show');
        this.addClass(document.querySelector("#menu" + id + " .dashed"), 'hide');
        this.removeClass(document.querySelector("#menu" + id + " .solid"), 'hide');
        this.addClass(document.querySelector("#menu" + id + " .solid"), 'show');
        this.removeClass(document.querySelector("#menu" + id + " .arrow-left"), 'hide');
        this.addClass(document.querySelector("#menu" + id + " .arrow-left"), 'show');
    };
    MainComponent.prototype.isBelowMenu = function (moduleId) {
        var count = 0;
        for (var i = 0; i < this.allMenuList.length; i++) {
            if (this.allMenuList[i].ParentId == moduleId) {
                count++;
            }
        }
        return count;
    };
    MainComponent.prototype.addClass = function (obj, cls) {
        if (obj) {
            var obj_class = obj.className;
            var blank = (obj_class != '') ? ' ' : '';
            var added = obj_class + blank + cls;
            obj.className = added;
        }
    };
    MainComponent.prototype.removeClass = function (obj, cls) {
        if (obj) {
            var obj_class = ' ' + obj.className + ' ';
            obj_class = obj_class.replace(/(\s+)/gi, ' ');
            var removed = obj_class.replace(' ' + cls + ' ', ' ');
            removed = removed.replace(/(^\s+)|(\s+$)/g, '');
            obj.className = removed;
        }
    };
    MainComponent.prototype.hasClass = function (obj, cls) {
        if (obj) {
            var obj_class = obj.className;
            var obj_class_lst = obj_class.split(/\s+/);
            for (var x in obj_class_lst) {
                if (obj_class_lst[x] == cls) {
                    return true;
                }
            }
        }
        return false;
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'dsp-index',
            templateUrl: '../htmls/main.html'
        }), 
        __metadata('design:paramtypes', [hencrypt_1.HEncrypt, main_service_1.MainService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map