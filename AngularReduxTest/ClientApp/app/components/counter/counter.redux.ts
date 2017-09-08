import { Action } from '@ngrx/store';
import { RootState } from '../../store/root.redux';

export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';
export const RESET_COUNT = 'RESET_COUNT';


export class IncrementCounterAction implements Action {
    type = INCREMENT_COUNT;

    constructor(public incrementBy: number) { }
}

export class DecrementCounterAction implements Action {
    type = DECREMENT_COUNT;

    constructor(public decrementBy: number) { }
}

export class ResetCounterAction implements Action {
    type = RESET_COUNT;

    constructor(public initialValue: number) { }
}

export type CounterActions = IncrementCounterAction | DecrementCounterAction | ResetCounterAction;


export interface CounterState {
    count: number;
}

const initialCounterState: CounterState = {
    count: 6
}

/*
  The reducer of the counter state. Each time an action for the counter is dispatched,
  it will create a new state for the counter.
 */

export function counterReducer(state: CounterState = initialCounterState, action: CounterActions): CounterState {
    switch (action.type) {
        case INCREMENT_COUNT: {
            return Object.assign({}, state, {
                count: state.count + (<IncrementCounterAction>action).incrementBy
            });
        }
        case DECREMENT_COUNT: {
            return Object.assign({}, state, {
                count: state.count - (<DecrementCounterAction>action).decrementBy
            });
        }
        case RESET_COUNT: {
            return Object.assign({}, state, {
                count: (<ResetCounterAction>action).initialValue
            });
        }
        default:
            return state;
    }
}

export class Methods {
    static getCounter = (state: RootState) => state.counter.count;
}
