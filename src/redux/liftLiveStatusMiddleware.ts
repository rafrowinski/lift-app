import { Dispatch, MiddlewareAPI } from 'redux';
import { SSEHelper } from '../helpers/SSEHelper';
import { liveLiftStatusReceived } from './actionCreators';
import { ILiftAction } from './actionInterfaces';

export const liftLiveStatusMiddleware = (_api: MiddlewareAPI<any>) => (next: Dispatch<ILiftAction>) => {
    const sseInstance = SSEHelper.instance;
    sseInstance.getLiftStatusObservable().subscribe(
        liftStatus => next(liveLiftStatusReceived(liftStatus)),
    )
    sseInstance.getLiftStatusErrorObservable().subscribe(console.error) // TODO implement error handling

    return (action: ILiftAction) => next(action);
}