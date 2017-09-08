//import { Injectable } from "@angular/core";
import { Action } from '@ngrx/store';
//import { Actions, Effect } from "@ngrx/effects";
import { RootState } from '../../store/root.redux';
import { WeatherForecast } from './fetchdata.model';
//import { FetchDataService } from "./fetchdata.service";
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/switchMap';

export const REQUEST_WEATHER_FORECASTS = 'REQUEST_WEATHER_FORECASTS';
export const RECEIVE_WEATHER_FORECASTS_SUCCESS = 'RECEIVE_WEATHER_FORECASTS_SUCCESS';
export const RECEIVE_WEATHER_FORECASTS_FAILED = 'RECEIVE_WEATHER_FORECASTS_FAILED';

export class RequestWeatherForecastsAction implements Action {
    readonly type = REQUEST_WEATHER_FORECASTS;
}
 
export class ReceiveWeatherForecastsSuccessAction implements Action {
    readonly type = RECEIVE_WEATHER_FORECASTS_SUCCESS;
    constructor(public forecasts: WeatherForecast[]) { }
}

export class ReceiveWeatherForecastsFailedAction implements Action {
    readonly type = RECEIVE_WEATHER_FORECASTS_FAILED;
}

export type FetchDataActions = RequestWeatherForecastsAction | ReceiveWeatherForecastsSuccessAction | ReceiveWeatherForecastsFailedAction;

export interface FetchDataState {
    isLoaded: boolean;
    hasFailed: boolean;
    forecasts: WeatherForecast[];
}

const initialState: FetchDataState = {
    isLoaded: false,
    hasFailed: false,
    forecasts: []
}

export function fetchDataReducer(state: FetchDataState = initialState, action: FetchDataActions): FetchDataState {
    switch (action.type) {
        case REQUEST_WEATHER_FORECASTS: {
            return Object.assign({}, state, {
                forecasts: [],
                isLoaded: false,
                hasFailed: false
            });
        }
        case RECEIVE_WEATHER_FORECASTS_SUCCESS: {
            return Object.assign({}, state, {
                forecasts: action.forecasts,
                isLoaded: true,
                hasFailed: false
            });
        }
        case RECEIVE_WEATHER_FORECASTS_FAILED: {
            return Object.assign({}, state, {
                forecasts: [],
                isLoaded: false,
                hasFailed: true
            });
        }
        default:
            return state;
    }
}

export class Methods {
    static getIsLoaded = (state: RootState) => state.fetchdata.isLoaded;
    static getWeatherForecasts = (state: RootState) => state.fetchdata.forecasts;
    static getHasFailed = (state: RootState) => state.fetchdata.hasFailed;
}
