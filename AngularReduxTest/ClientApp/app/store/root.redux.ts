import * as fromRouter from '@ngrx/router-store';
import * as fromCounter from '../components/counter/counter.redux';
import * as fromFetchData from '../components/fetchdata/fetchdata.redux';

export interface RootState {
    counter: fromCounter.CounterState;
    fetchdata: fromFetchData.FetchDataState;
    router: fromRouter.RouterReducerState;
}

export const RootReducers = {
    counter: fromCounter.counterReducer,
    fetchdata: fromFetchData.fetchDataReducer,
    router: fromRouter.routerReducer
};


