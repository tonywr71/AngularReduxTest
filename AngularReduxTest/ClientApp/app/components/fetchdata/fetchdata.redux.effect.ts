import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { FetchDataService } from "./fetchdata.service";
import * as fromFetchData from './fetchdata.redux';


@Injectable()
export class FetchDataReduxEffect {

    constructor(private actions: Actions, private fetchDataService: FetchDataService) { }

    @Effect()
    fetchWeatherForecasts$ = this.actions.ofType(fromFetchData.REQUEST_WEATHER_FORECASTS)
            .switchMap(() => this.fetchDataService.getWeatherForecasts()
                .map((response: any) => {
                    return new fromFetchData.ReceiveWeatherForecastsSuccessAction(response.json());
            }))
        .catch((response: any) => Observable.of(new fromFetchData.ReceiveWeatherForecastsFailedAction()));

}
