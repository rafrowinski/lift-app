import React, { FC, memo, useCallback } from 'react';
import { Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import { callLift, LiftThunkDispatch } from '../../redux/actionCreators';
import { IStore } from '../../redux/store';
import { CallLift } from '../CallLift/CallLift';
import { WaitingScreen } from '../WaitingScreen/WaitingScreen';

interface IDispatchProps {
    callLift: (floorNumber: number) => void;
}

type IProps = IDispatchProps;

const getSteps = () => ['wybierz piętro', 'poczekaj na windę'];

const Component: FC<IProps> = ({ callLift }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [chosenFloor, setChosenFloor] = useState(-1);
    const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
    const goBack = () => setActiveStep(0);

    const callLiftCallback = useCallback((floorNumber: number) => {
        callLift(floorNumber); // useEffect and check if available!
        setChosenFloor(floorNumber);
        nextStep();
    }, [])

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

type IMapDispatchToProps = (dispatch: LiftThunkDispatch) => IDispatchProps;

const mapDispatchToProps: IMapDispatchToProps = (dispatch: LiftThunkDispatch) => ({
    callLift: (floorNumber: number) => dispatch(callLift(floorNumber)),
})

export const memoLiftWizard = memo(Component);

export const LiftWizard = connect<{}, IDispatchProps, {}, IStore>(null, mapDispatchToProps)(memoLiftWizard);