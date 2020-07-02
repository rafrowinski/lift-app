import React, { FC, memo } from 'react';
import { CircularProgress, Button, Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BuildingData } from '../../helpers/RestHelper';
import { LiftThunkDispatch, requestBuildingData } from '../../redux/actionCreators';
import { IStore } from '../../redux/store';

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

type IProps = IStateProps & IDispatchProps;

const Container: FC<IProps> = ({ buildingData, requestBuildingData }) => {
    const classes = useStyles();

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
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center">
            <Grid item
                  md={4}
                  sm={12}>
                {renderPanel()}
            </Grid>
        </Grid>

    );
}

type IMapStateToProps = (store: IStore) => IStateProps;

const mapStateToProps: IMapStateToProps = ({ buildingData }) => ({
    buildingData,
})

type IMapDispatchToProps = (dispatch: Dispatch) => IDispatchProps;

const mapDispatchToProps: IMapDispatchToProps = (dispatch: LiftThunkDispatch) => ({
    requestBuildingData: () => dispatch(requestBuildingData()),
})

export const memoCallLift = memo(Container);

export const CallLift = connect<IStateProps, IDispatchProps, {}, IStore>(mapStateToProps, mapDispatchToProps)(memoCallLift);