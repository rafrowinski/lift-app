import { Dispatch } from 'redux';
import { Actions } from './actions'
import { BuildingData, LiftStatusArray, RestHelper } from '../helpers/RestHelper'
import { LiftStatus } from '../helpers/SSEHelper'
import {
    IBuildingDataReceivedAction,
    ILiftStatusArrayReceivedAction,
    ILiveLiftStatusReceivedAction,
} from './actionInterfaces'

export const requestLiftStatus = () => (dispatch: Dispatch) =>
    RestHelper.getLiftStatus().then(status => dispatch(liftStatusReceived(status)));

export const liftStatusReceived = (liftStatusArray: LiftStatusArray): ILiftStatusArrayReceivedAction => ({
    type: Actions.LiftStatusArrayReceived,
    liftStatusArray,
})

export const requestBuildingData = () => (dispatch: Dispatch) =>
    RestHelper.getBuildingData().then(data => dispatch(buildingDataReceived(data)));

export const buildingDataReceived = (buildingData: BuildingData): IBuildingDataReceivedAction => ({
    type: Actions.BuildingDataReceived,
    buildingData,
})

export const liveLiftStatusReceived = (liftStatus: LiftStatus): ILiveLiftStatusReceivedAction => ({
    type: Actions.LiveLiftStatusReceived,
    liftStatus,
})