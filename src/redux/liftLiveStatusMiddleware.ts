import { Dispatch } from 'redux';
import { SSEHelper } from '../helpers/SSEHelper';
import { liveLiftStatusReceived } from './actionCreators';
import { ILiftAction } from './actionInterfaces';

// TODO check store/api type
export const liftLiveStatusMiddleware = (_store: any) => (next: Dispatch<ILiftAction>) => {
    const sseInstance = SSEHelper.instance;
    sseInstance.getLiftStatusObservable().subscribe(
        liftStatus => next(liveLiftStatusReceived(liftStatus)),
    )
    sseInstance.getLiftStatusErrorObservable().subscribe(console.error) // TODO implement error handling

    return (action: ILiftAction) => next(action);
}