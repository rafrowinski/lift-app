import { ILiftAction } from './actionInterfaces';
import { Actions } from './actions';
import { initialStore } from './store';

export const liftReducer = (state = initialStore, action: ILiftAction) => {
    switch (action.type) {
        case Actions.LiftStatusArrayReceived:
            return { ...state, liftStatusArray: action.liftStatusArray };

        case Actions.CalledLiftStatusReceived:
            return { ...state, calledLiftStatus: action.liftStatus };

        case Actions.BuildingDataReceived:
            return { ...state, buildingData: action.buildingData };

        case Actions.LiveLiftStatusReceived:
            const { liftStatus } = action;
            return { ...state, liftStatusMap: { ...state.liftStatusMap, [liftStatus.id]: liftStatus } };

        default:
            return state;
    }
}