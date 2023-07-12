
import { Grid } from '@mui/material'
import React from 'react'

interface Props {
    selectedLocation: string
}

const LocationDetails: React.FC<Props> = ({ selectedLocation }) => {
    return (
        <Grid item container xs={12} >
            Location Details...{selectedLocation}
        </Grid>
    )
}

export default LocationDetails
