/**
 * Created by hale on 2016/11/21.
 */

import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent}   from '../components/views/login.component';
import {IndexComponent} from '../components/views/index.component';
import {MainComponent} from '../components/views/main.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    {path: 'login', component: LoginComponent},
    {path: 'index', component: IndexComponent},
    {path: 'main', component: MainComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RootRoutingModule {
}
