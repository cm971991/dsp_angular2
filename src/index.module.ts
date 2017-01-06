/**
 * Created by hale on 2016/11/22.
 */

import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

//service
import {LoginService} from './services/login.service';
import {MainService} from './services/main.service';
import {Logger} from './shared/logger';
import {HEncrypt} from './shared/hencrypt';

// view
import {IndexComponent} from './components/views/index.component';
import {LoginComponent} from './components/views/login.component';
import {MainComponent} from './components/views/main.component';

import {RootRoutingModule} from './routes/root-routing.module';

//pipe
import {MenuPipe, ChildMenuPipe, MenuNoChildPipe} from './pipe/menu.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RootRoutingModule
    ],
    providers: [
        Logger,
        LoginService,
        MainService,
        HEncrypt
    ],
    declarations: [
        LoginComponent,
        IndexComponent,
        MainComponent,
        MenuPipe,
        ChildMenuPipe,
        MenuNoChildPipe
    ],
    bootstrap: [IndexComponent]
})

export class IndexModule {
}

