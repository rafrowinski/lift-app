import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import { SSEList } from '../../SSEList';
import { CallLift } from '../CallLift/CallLift';

function App() {
    return (
        <Container >
            <CallLift />
            <SSEList />
        </Container>
    );
}

export default App;
