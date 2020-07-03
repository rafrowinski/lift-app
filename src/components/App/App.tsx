import React from 'react';
import { Container, Grid } from '@material-ui/core';
import { LiftWizard } from '../LiftStepper/LiftWizard';

function App() {
    return (
        <Container>
            <Grid container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justify="center">
                <Grid item
                      md={4}
                      sm={12}>
                    <LiftWizard/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
