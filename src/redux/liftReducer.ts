import { ILiftAction } from './actionInterfaces';
import { Actions } from './actions';
import { initialStore } from './store';

export const mainReducer = (state = initialStore, action: ILiftAction) => {
    switch (action.type) {
        case Actions.RequestLiftStatus:
            return;
        case Actions.LiftStatusReceived:
            return;
        case Actions.RequestBuildingData:
            return;
        case Actions.BuildingDataReceived:
            return { ...state, buildingData: action.buildingData };
        case Actions.LiveLiftStatusReceived:
            return
    }
}