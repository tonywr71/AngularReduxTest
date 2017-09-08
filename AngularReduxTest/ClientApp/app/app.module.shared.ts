import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RootReducers } from "./store/root.redux";
import { EffectsModule } from "@ngrx/effects";
import { FetchDataReduxEffect } from "./components/fetchdata/fetchdata.redux.effect";
import { FetchDataService } from "./components/fetchdata/fetchdata.service";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        /*
           Provide the application reducer to the store.
       */
        StoreModule.forRoot(RootReducers),
        StoreDevtoolsModule.instrument(),
        StoreRouterConnectingModule,
        EffectsModule.forRoot([FetchDataReduxEffect])
    ],
    providers: [
        FetchDataReduxEffect,
      FetchDataService
    ]
})
export class AppModuleShared {
}
