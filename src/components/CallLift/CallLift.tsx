import React, { FC, memo, useCallback } from 'react';
import { CircularProgress, Button, Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { BuildingData } from '../../helpers/RestHelper';
import { LiftThunkDispatch, requestBuildingData } from '../../redux/actionCreators';
import { IStore } from '../../redux/store';

interface IOwnProps {
    onFloorSelected: (floorNumber: number) => void
}

interface IStateProps {
    buildingData: BuildingData | null;
}

interface IDispatchProps {
    requestBuildingData: () => void;
}

const useStyles = makeStyles({
    button: {
        width: '100%',
    },
    buttonGrid: {
        flexWrap: 'wrap-reverse',
    },
});

type IProps = IOwnProps & IStateProps & IDispatchProps;

const Component: FC<IProps> = ({ buildingData, requestBuildingData, onFloorSelected }) => {
    const classes = useStyles();
    const onFloorSelectedCallback = useCallback((floorNumber: number) => onFloorSelected(floorNumber), [onFloorSelected]);

    const renderPanel = () => {
        if (!buildingData) {
            requestBuildingData();
            return (<CircularProgress/>);
        } else {
            const floorButtons = [];
            for (let i = 0; i < buildingData.floors; i++) {
                floorButtons.push((
                    <Grid item
                          xs={4}
                          key={`floor-button-${i}`}>
                        <Button variant="contained"
                                onClick={() => onFloorSelectedCallback(i)}
                                className={classes.button}>{i}</Button>
                    </Grid>
                ))
            }
            return (
                <Grid
                    container
                    className={classes.buttonGrid}
                    spacing={1}
                    alignItems="flex-start"
                    justify="flex-start">
                    {floorButtons}
                </Grid>
            );

        }
    }

    return (
        <>
            {renderPanel()}
        </>
    );
}

type IMapStateToProps = (store: IStore) => IStateProps;

const mapStateToProps: IMapStateToProps = ({ buildingData }) => ({
    buildingData,
})

type IMapDispatchToProps = (dispatch: LiftThunkDispatch) => IDispatchProps;

const mapDispatchToProps: IMapDispatchToProps = (dispatch: LiftThunkDispatch) => ({
    requestBuildingData: () => dispatch(requestBuildingData()),
})

export const memoCallLift = memo(Component);

export const CallLift = connect<IStateProps, IDispatchProps, IOwnProps, IStore>(mapStateToProps, mapDispatchToProps)(memoCallLift);