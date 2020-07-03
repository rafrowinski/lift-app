import { fetch as fetchPolyfill } from 'whatwg-fetch';
import { LiftStatus } from './SSEHelper';

const fetch = window.fetch || fetchPolyfill;

const baseUrl = 'http://localhost:8080';

const putSettings = { method: 'PUT' };

export interface BuildingData {
    floors: number,
    elevators: number,
}

export type LiftStatusArray = Array<LiftStatus>;

export interface CallLiftResponse {
    elevator?: LiftStatus,
    error?: string
}

export const RestHelper = {
    getBuildingData: (): Promise<BuildingData> =>
        fetch(`${baseUrl}/building`)
            .then(response => response.json()),

    getLiftStatus: (): Promise<LiftStatusArray> =>
        fetch(`${baseUrl}/elevators`)
            .then(response => response.json()),

    callLift: (floorNumber: number): Promise<CallLiftResponse> =>
        fetch(`${baseUrl}/floor/${floorNumber}`, putSettings)
            .then(response => response.json()),
}