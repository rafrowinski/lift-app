// TODO add fetch polyfill just in case
import { LiftStatus } from './SSEHelper';

function baseUrl(strings: TemplateStringsArray, ...values: Array<number>) {
    return `http://localhost:8080${strings[0]}${values[0]}`;
}

export interface BuildingData {
    floors: number,
    elevators: number,
}

export type LiftStatusArray = Array<LiftStatus>;

export const RestHelper = {
    getBuildingData: (): Promise<BuildingData> => fetch(baseUrl`/building`)
        .then(response => response.json()),
    getLiftStatus: (): Promise<LiftStatusArray> => fetch(baseUrl`/elevators`)
        .then(response => response.json()),
    callLift: (floorNumber: number): Promise<LiftStatus> => fetch(baseUrl`/floor/${floorNumber}`)
        .then(response => response.json()),
}