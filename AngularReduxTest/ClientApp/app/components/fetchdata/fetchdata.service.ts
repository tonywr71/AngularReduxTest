import { Injectable, Inject } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from "@angular/http";
import { Subject, Observable } from 'rxjs/RX'

@Injectable()
export class FetchDataService {

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    public getWeatherForecasts(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/SampleData/WeatherForecasts');
    }
}