import { BuildingData } from '../helpers/RestHelper';
import { LiftStatus } from '../helpers/SSEHelper';

export type LiftStatusMap = Record<string, LiftStatus>;

export interface IInitialStore {
    buildingData: BuildingData | null;
    liftStatusMap: LiftStatusMap;
    calledLiftStatus: LiftStatus | null;
}

export const initialStore: IInitialStore = {
    buildingData: null,
    liftStatusMap: {},
    calledLiftStatus: null,
}

export const store;