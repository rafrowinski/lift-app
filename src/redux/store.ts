import { applyMiddleware, createStore } from 'redux';
import { BuildingData, CallLiftResponse, LiftStatusArray } from '../helpers/RestHelper';
import { LiftStatus } from '../helpers/SSEHelper';
import { liftLiveStatusMiddleware } from './liftLiveStatusMiddleware';
import { liftReducer } from './liftReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export type LiftStatusMap = Record<string, LiftStatus>;

export interface IStore {
    buildingData: BuildingData | null;
    liftStatusMap: LiftStatusMap;
    liftStatusArray: LiftStatusArray | null;
    calledLiftStatus: CallLiftResponse | null;
}

export const initialStore: IStore = {
    buildingData: null,
    liftStatusMap: {},
    liftStatusArray: null,
    calledLiftStatus: null,
}

export type IMapStateToProps<I>  = (store: IStore) => I;

export const store = createStore(liftReducer, composeWithDevTools(applyMiddleware(thunk, liftLiveStatusMiddleware)));