import { Grid } from '@mui/material'
import React from 'react'
import './LocationList.css'


const LocationList = () => {
    return (
        <Grid item container xs={12} className='list_container'>
            <Grid item container xs={12}>Refresh & title </Grid>
            <Grid item container xs={12}>Search</Grid>
            <Grid item container xs={12}>Filters </Grid>
            <Grid item container xs={12}> Location Card Listing</Grid>
            <Grid item container xs={12}> Pagination</Grid>


        </Grid>
    )
}

export default LocationList
