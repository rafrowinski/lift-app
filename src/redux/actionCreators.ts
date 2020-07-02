import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Actions } from './actions'
import { BuildingData, CallLiftResponse, LiftStatusArray, RestHelper } from '../helpers/RestHelper'
import { LiftStatus } from '../helpers/SSEHelper'
import {
    IBuildingDataReceivedAction, ICalledLiftStatusReceivedAction,
    ILiftAction,
    ILiftStatusArrayReceivedAction,
    ILiveLiftStatusReceivedAction,
} from './actionInterfaces'
import { IStore } from './store';

export type LiftThunkResult<R = void> = ThunkAction<R, IStore, undefined, ILiftAction>;
export type LiftThunkDispatch = ThunkDispatch<IStore, undefined, ILiftAction>;

export const requestLiftStatus =
    (): LiftThunkResult =>
        (dispatch: LiftThunkDispatch) =>
            RestHelper.getLiftStatus().then(status => dispatch(liftStatusReceived(status)));

export const liftStatusReceived = (liftStatusArray: LiftStatusArray): ILiftStatusArrayReceivedAction => ({
    type: Actions.LiftStatusArrayReceived,
    liftStatusArray,
})

export const requestBuildingData =
    (): LiftThunkResult =>
        (dispatch: LiftThunkDispatch) =>
            RestHelper.getBuildingData().then(data => dispatch(buildingDataReceived(data)));

export const buildingDataReceived = (buildingData: BuildingData): IBuildingDataReceivedAction => ({
    type: Actions.BuildingDataReceived,
    buildingData,
})

export const liveLiftStatusReceived = (liftStatus: LiftStatus): ILiveLiftStatusReceivedAction => ({
    type: Actions.LiveLiftStatusReceived,
    liftStatus,
})

export const callLift =
    (floorNumber: number): LiftThunkResult =>
        (dispatch: LiftThunkDispatch) =>
            RestHelper.callLift(floorNumber).then(data => dispatch(calledLiftStatusReceived(data)));

export const calledLiftStatusReceived = (liftStatus: CallLiftResponse): ICalledLiftStatusReceivedAction => ({
    type: Actions.CalledLiftStatusReceived,
    liftStatus,
})