import { Actions } from './actions'
import { BuildingData, LiftStatusArray } from '../helpers/RestHelper'
import { LiftStatus } from '../helpers/SSEHelper'
import {
    IBuildingDataReceivedAction,
    ILiftStatusReceivedAction,
    ILiveLiftStatusReceivedAction,
    IRequestBuildingDataAction,
    IRequestLiftStatusAction
} from './actionInterfaces'

export const RequestLiftStatus = (): IRequestLiftStatusAction => ({
    type: Actions.RequestLiftStatus,
});

export const LiftStatusReceived = (liftStatusArray: LiftStatusArray): ILiftStatusReceivedAction => ({
    type: Actions.LiftStatusReceived,
    liftStatusArray,
})

export const RequestBuildingData = (): IRequestBuildingDataAction => ({
    type: Actions.RequestBuildingData,
})

export const BuildingDataReceived = (buildingData: BuildingData): IBuildingDataReceivedAction => ({
    type: Actions.BuildingDataReceived,
    buildingData,
})

export const LiveLiftStatusReceived = (liftStatus: LiftStatus): ILiveLiftStatusReceivedAction => ({
    type: Actions.LiveLiftStatusReceived,
    liftStatus,
})