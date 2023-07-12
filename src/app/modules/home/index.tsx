import { Grid } from '@mui/material';
import { lazy } from 'react';
import './index.css';

const LocationDetails = lazy(() => import('../../components/LocationDetails'));
const LocationList = lazy(() => import('../../components/LocationList'));

function App() {
    return (
        <div>
            <Grid container columnSpacing={3}>
                <Grid item container xs={6} >
                    <LocationList />
                </Grid>
                <Grid item container xs={6}>
                    <LocationDetails />
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
