import { Card, CardContent, CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
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

// TODO przenieś tutaj mechanizm przywołania windy + uwzględnij że wszystkie mogą być zajęte
const Component: FC<IProps> = ({ chosenFloor, liftStatusMap, liftStatusArray, calledLiftStatus }) => {
    const getLiftNumber = (liftId: string) => liftId.split('elv')[1];

    const renderPanel = () => {
        if (calledLiftStatus && calledLiftStatus.elevator) {
            return (
                <Card>
                    <CardContent>
                        <Typography component="h5" variant="h5">
                            Przyjedzie po Ciebie winda numer {getLiftNumber(calledLiftStatus.elevator.id)}
                        </Typography>
                    </CardContent>
                </Card>
            );
        } else {
            return (
                <Paper>
                    <Grid container>
                        <Grid item>
                            <div>Daj nam chwilę. Szukamy windy najbliższej Ciebie</div>
                        </Grid>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                </Paper>
            )
        }
    };
    return (
        <>
            {renderPanel()}

            <div>chosenFloor {JSON.stringify(chosenFloor)}</div>
            <div>liftStatusMap {JSON.stringify(liftStatusMap)}</div>
            <div>liftStatusArray {JSON.stringify(liftStatusArray)}</div>
            <div>calledLiftStatus {JSON.stringify(calledLiftStatus)}</div>
        </>
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