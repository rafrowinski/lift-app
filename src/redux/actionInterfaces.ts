import { Action } from 'redux';
import { Actions } from './actions';
import { BuildingData, LiftStatusArray } from '../helpers/RestHelper';
import { LiftStatus } from '../helpers/SSEHelper';

export interface IRequestLiftStatusAction extends Action {
    type: Actions.RequestLiftStatus;
}

export interface ILiftStatusReceivedAction extends Action {
    type: Actions.LiftStatusReceived;
    liftStatusArray: LiftStatusArray;
}

export interface IRequestBuildingDataAction extends Action {
    type: Actions.RequestBuildingData;
}

export interface IBuildingDataReceivedAction extends Action {
    type: Actions.BuildingDataReceived;
    buildingData: BuildingData;
}

export interface ILiveLiftStatusReceivedAction extends Action {
    type: Actions.LiveLiftStatusReceived;
    liftStatus: LiftStatus;
}


export type ILiftAction =
    IRequestLiftStatusAction |
    ILiftStatusReceivedAction |
    IRequestBuildingDataAction |
    IBuildingDataReceivedAction |
    ILiveLiftStatusReceivedAction
    ;