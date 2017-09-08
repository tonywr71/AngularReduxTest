import { Component, Inject } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

// Import the root state in order to select parts of it.
import * as fromRoot from '../../store/root.redux';
// Import the counter actions and observable methods to make dispatching from the component possible.
import * as fromFetchData from './fetchdata.redux';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {

    public forecasts: WeatherForecast[];
    public forecasts$: Observable<WeatherForecast[]>;
    public forecastsLoaded$: Observable<boolean>;
    public hasFailed$: Observable<boolean>;

    //constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
    //    http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
    //        this.forecasts = result.json() as WeatherForecast[];
    //    }, error => console.error(error));
    //}

    constructor(private store: Store<fromRoot.RootState>) {
        this.forecasts$ = store.select(fromFetchData.Methods.getWeatherForecasts);
        this.forecastsLoaded$ = store.select(fromFetchData.Methods.getIsLoaded);
        this.hasFailed$ = store.select(fromFetchData.Methods.getHasFailed);
    }

    ngOnInit() {

        this.forecastsLoaded$.subscribe((isLoaded: boolean) => {
            if (!isLoaded)
            {
                this.store.dispatch(new fromFetchData.RequestWeatherForecastsAction());
            }
        });
        this.hasFailed$.subscribe((hasFailed: boolean) => {
            if (hasFailed) {
                console.log("Oh no, it's failed!")
            }
        });

    }

}



interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
