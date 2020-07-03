import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

const EventSource = NativeEventSource || EventSourcePolyfill;

const liftStatusStreamUrl = 'http://localhost:8080/stream';
const messageEventName = 'message';
const errorEventName = 'error';

export enum LiftState {
    moving = 'moving',
    up = 'up',
    down = 'down',
}

export type LiftStatus = {
    id: string;
    floor: number;
    state: LiftState;
    targetFloor?: number;
}

// TODO add error handling
export type LiftStatusError = {
    error: string;
}

export class SSEHelper {
    private static _instance: SSEHelper;
    private _liftStatusEventSource: EventSource;

    private constructor() {
        this._liftStatusEventSource = new EventSource(liftStatusStreamUrl);
    }

    static get instance() {
        if (!SSEHelper._instance) {
            SSEHelper._instance = new SSEHelper();
        }

        return SSEHelper._instance;
    }

    getLiftStatusObservable = () =>
        fromEvent<MessageEvent>(this._liftStatusEventSource, messageEventName)
            .pipe<LiftStatus>(map(event => JSON.parse(event.data)))

    getLiftStatusErrorObservable = () =>
        fromEvent<MessageEvent>(this._liftStatusEventSource, errorEventName)
}