import {fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';

const liftStatusStreamUrl = 'http://localhost:8080/stream';
const messageEventName = 'message'

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
            .pipe(map(event => event.data))
}