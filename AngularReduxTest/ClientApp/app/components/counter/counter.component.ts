import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

// Import the root state in order to select parts of it.
import * as fromRoot from '../../store/root.redux';
// Import the counter actions and observable methods to make dispatching from the component possible.
import * as fromCounter from './counter.redux';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    //public currentCount = 0;
    public currentCount$: Observable<number>;

    constructor(private store: Store<fromRoot.RootState>) {
        this.currentCount$ = store.select(fromCounter.Methods.getCounter);
    }

    public incrementCounter() {
        //this.currentCount++;
        this.store.dispatch(new fromCounter.IncrementCounterAction(3));
    }

    public decrementCounter() {
        this.store.dispatch(new fromCounter.DecrementCounterAction(2));
    }

    public resetCounter() {
        this.store.dispatch(new fromCounter.ResetCounterAction(15));
    }

}
