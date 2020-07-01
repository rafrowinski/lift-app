import {fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';

// TODO singleton?
export const SSEHelper = {
    getLiftStatusObservable: () => {
        const liftStatusEventSource = new EventSource("http://localhost:8080/stream");
        return fromEvent<MessageEvent>(liftStatusEventSource, 'message')
            .pipe(map(event => event.data))
    },
}