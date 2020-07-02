import { Card, CardContent, CircularProgress, Grid, Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { connect } from 'react-redux';
import { CallLiftResponse, LiftStatusArray } from '../../helpers/RestHelper';
import { LiftStatus } from '../../helpers/SSEHelper';
import { IStore, LiftStatusMap } from '../../redux/store';

interface IOwnProps {
    chosenFloor: number;
}

interface IStateProps {
    liftStatusMap: LiftStatusMap;
    liftStatusArray: LiftStatusArray | null;
    calledLiftStatus: CallLiftResponse | null;
}

type IProps = IOwnProps & IStateProps;

const Component: FC<IProps> = ({ chosenFloor, liftStatusMap, liftStatusArray, calledLiftStatus }) => {
    const getLiftNumber = (liftId: string) => liftId.split('elv')[1];

    const renderLiveStatus = (calledLiftStatus: LiftStatus) => {
        const calledLiftId = calledLiftStatus.id;
        const currentFloor = liftStatusMap[calledLiftId].floor;
        const liftNumber = getLiftNumber(calledLiftId);

        if (currentFloor === calledLiftStatus.targetFloor) {
            return (
                <Typography component="h5" variant="h5">
                    Juz jest! Wejdź do windy numer {liftNumber}
                </Typography>
            )
        } else {
            return (
                <Grid item xs={12}>
                    <Typography component="h5" variant="h5">
                        Przyjedzie po Ciebie winda numer {liftNumber}
                    </Typography>
                    {currentFloor && (<Typography component="h5" variant="h5">
                        obecnie jest na piętrze {currentFloor}
                    </Typography>)}
                </Grid>
            );
        }
    }

    const renderPanel = () => {
        if (calledLiftStatus && calledLiftStatus.elevator && liftStatusMap && liftStatusMap[calledLiftStatus.elevator.id]) {
            return renderLiveStatus(calledLiftStatus.elevator);
        } else {
            return (
                <>
                    <Grid item xs={12}>
                        <Typography component="h5" variant="h5">Daj nam chwilę. Szukamy dla Ciebie windy</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CircularProgress/>
                    </Grid>
                </>
            );
        }
    };

    return (
        <Card>
            <CardContent>
                <Grid container>
                    {renderPanel()}
                </Grid>
            </CardContent>
        </Card>
    );
}


type IMapStateToProps = (store: IStore) => IStateProps;

const mapStateToProps: IMapStateToProps = ({ liftStatusMap, liftStatusArray, calledLiftStatus }) => ({
    liftStatusMap,
    liftStatusArray,
    calledLiftStatus,
});

export const memoWaitingScreen = memo(Component);

export const WaitingScreen = connect<IStateProps, null, IOwnProps, IStore>(mapStateToProps)(memoWaitingScreen);