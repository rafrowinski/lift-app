import { Action } from 'redux';
import { Actions } from './actions';
import { BuildingData, CallLiftResponse, LiftStatusArray } from '../helpers/RestHelper';
import { LiftStatus } from '../helpers/SSEHelper';

export interface ILiftStatusArrayReceivedAction extends Action {
    type: Actions.LiftStatusArrayReceived;
    liftStatusArray: LiftStatusArray;
}

export interface ICalledLiftStatusReceivedAction extends Action {
    type: Actions.CalledLiftStatusReceived;
    liftStatus: CallLiftResponse;
}

export interface IBuildingDataReceivedAction extends Action {
    type: Actions.BuildingDataReceived;
    buildingData: BuildingData;
}

export interface ILiveLiftStatusReceivedAction extends Action {
    type: Actions.LiveLiftStatusReceived;
    liftStatus: LiftStatus;
}

export interface ICalledLiftStatusReceivedAction extends Action {
    type: Actions.CalledLiftStatusReceived;
    liftStatus: CallLiftResponse;
}

export type ILiftAction =
    ILiftStatusArrayReceivedAction
    | ICalledLiftStatusReceivedAction
    | IBuildingDataReceivedAction
    | ILiveLiftStatusReceivedAction
    ;