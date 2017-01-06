/**
 * Created by hale on 2016/11/28.
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
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
var MenuPipe = (function () {
    function MenuPipe() {
    }
    MenuPipe.prototype.transform = function (list, parentId, allList) {
        var resultList = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].ParentId == parentId) {
                if (this.isBelowMenu(allList, list[i].ModuleId) > 0) {
                    resultList.push(list[i]);
                }
            }
        }
        return resultList;
    };
    MenuPipe.prototype.isBelowMenu = function (list, moduleId) {
        var count = 0;
        if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].ParentId == moduleId) {
                    count++;
                }
            }
        }
        return count;
    };
    MenuPipe = __decorate([
        core_1.Pipe({ name: 'limitMenu' }), 
        __metadata('design:paramtypes', [])
    ], MenuPipe);
    return MenuPipe;
}());
exports.MenuPipe = MenuPipe;
var MenuNoChildPipe = (function () {
    function MenuNoChildPipe() {
    }
    MenuNoChildPipe.prototype.transform = function (list, parentId, allList) {
        var resultList = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].ParentId == parentId) {
                if (this.isBelowMenu(allList, list[i].ModuleId) <= 0) {
                    resultList.push(list[i]);
                }
            }
        }
        return resultList;
    };
    MenuNoChildPipe.prototype.isBelowMenu = function (list, moduleId) {
        var count = 0;
        if (list && list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].ParentId == moduleId) {
                    count++;
                }
            }
        }
        return count;
    };
    MenuNoChildPipe = __decorate([
        core_1.Pipe({ name: 'limitNoChildMenu' }), 
        __metadata('design:paramtypes', [])
    ], MenuNoChildPipe);
    return MenuNoChildPipe;
}());
exports.MenuNoChildPipe = MenuNoChildPipe;
var ChildMenuPipe = (function () {
    function ChildMenuPipe() {
    }
    ChildMenuPipe.prototype.transform = function (list, parentId) {
        var resultList = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].ParentId == parentId) {
                resultList.push(list[i]);
            }
        }
        return resultList;
    };
    ChildMenuPipe = __decorate([
        core_1.Pipe({ name: 'limitChildMenu' }), 
        __metadata('design:paramtypes', [])
    ], ChildMenuPipe);
    return ChildMenuPipe;
}());
exports.ChildMenuPipe = ChildMenuPipe;
//# sourceMappingURL=menu.pipe.js.map