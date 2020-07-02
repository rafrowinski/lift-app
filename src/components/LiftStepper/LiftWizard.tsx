import React, { FC, memo, useCallback, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import { CallLiftResponse } from '../../helpers/RestHelper';
import { callLift, LiftThunkDispatch } from '../../redux/actionCreators';
import { IStore } from '../../redux/store';
import { CallLift } from '../CallLift/CallLift';
import { WaitingScreen } from '../WaitingScreen/WaitingScreen';

interface IStateProps {
    calledLiftStatus: CallLiftResponse | null;
}

interface IDispatchProps {
    callLift: (floorNumber: number) => void;
}

type IProps = IDispatchProps & IStateProps;

const getSteps = () => ['wybierz piętro', 'poczekaj na windę'];
const nextRequestWaitMillis = 300;

const Component: FC<IProps> = ({ callLift, calledLiftStatus }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [chosenFloor, setChosenFloor] = useState(-1);

    const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
    const goBack = () => setActiveStep(0);

    const callLiftCallback = useCallback((floorNumber: number) => {
        callLift(floorNumber);
        setChosenFloor(floorNumber);
        nextStep();
    }, [])

    useEffect(() => {
        if (chosenFloor > 0 && calledLiftStatus && calledLiftStatus.error) {
            setTimeout(() => callLift(chosenFloor!), nextRequestWaitMillis);
        }
    });

    const steps = getSteps();

    const getStepComponent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <CallLift onFloorSelected={callLiftCallback}/>
                );
            case 1:
                return (
                    <>
                        <WaitingScreen chosenFloor={chosenFloor}/>
                        <Button variant="contained"
                                onClick={() => goBack()}>Zamów kolejną</Button>
                    </>
                );
        }
    }

    return (
        <>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {getStepComponent(activeStep)}
        </>
    );
}

type IMapStateToProps = (store: IStore) => IStateProps; // TODO create an interface with a generic type for return type

const mapStateToProps: IMapStateToProps = ({ calledLiftStatus }) => ({
    calledLiftStatus,
});

type IMapDispatchToProps = (dispatch: LiftThunkDispatch) => IDispatchProps;

const mapDispatchToProps: IMapDispatchToProps = (dispatch: LiftThunkDispatch) => ({
    callLift: (floorNumber: number) => dispatch(callLift(floorNumber)),
})

export const memoLiftWizard = memo(Component);

export const LiftWizard = connect<IStateProps, IDispatchProps, {}, IStore>(mapStateToProps, mapDispatchToProps)(memoLiftWizard);