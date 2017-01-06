/**
 * Created by hale on 2016/11/28.
 */

import {Pipe, PipeTransform} from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
 */
@Pipe({name: 'limitMenu'})
export class MenuPipe implements PipeTransform {
    transform(list: any, parentId: string, allList: any): any[] {
        let resultList: any[] = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].ParentId == parentId) {
                if (this.isBelowMenu(allList, list[i].ModuleId) > 0) {
                    resultList.push(list[i]);
                }
            }
        }
        return resultList;
    }

    isBelowMenu(list: any, moduleId: string): number {
        let count = 0;
        if (list && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].ParentId == moduleId) {
                    count++;
                }
            }
        }
        return count;
    }
}

@Pipe({name: 'limitNoChildMenu'})
export class MenuNoChildPipe implements PipeTransform {
    transform(list: any, parentId: string, allList: any): any[] {
        let resultList: any[] = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].ParentId == parentId) {
                if (this.isBelowMenu(allList, list[i].ModuleId) <= 0) {
                    resultList.push(list[i]);
                }
            }
        }
        return resultList;
    }

    isBelowMenu(list: any, moduleId: string): number {
        let count = 0;
        if (list && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].ParentId == moduleId) {
                    count++;
                }
            }
        }
        return count;
    }
}


@Pipe({name: 'limitChildMenu'})
export class ChildMenuPipe implements PipeTransform {
    transform(list: any, parentId: string): any[] {
        let resultList: any[] = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i].ParentId == parentId) {

                resultList.push(list[i]);

            }
        }
        return resultList;
    }

}