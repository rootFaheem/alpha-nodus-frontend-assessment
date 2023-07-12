import { Box, Button, Grid, Stack } from '@mui/material'
import React from 'react'
import './LocationList.css'
import LoopIcon from '@mui/icons-material/Loop';
import SearchField from './SearchField';
import LocationCard from './LocationCard';

interface Props {
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
}


const LocationList: React.FC<Props> = ({ setSelectedLocation }) => {
    return (
        <Grid item container xs={12} className='list_container'>
            <Grid item container xs={12} alignItems="center">
                <Stack direction="row" alignItems="center" width="100%">
                    <Button variant="outlined" fullWidth={true} size='small' className='refresh_btn'>
                        <LoopIcon />
                    </Button>
                    <Box className="heading">
                        Locations
                    </Box>
                </Stack>
            </Grid>
            <Grid item container xs={12}
                mt={2}
                mb={2}
            >
                <SearchField />
            </Grid>

            <Grid item container xs={12}>
                <Stack direction="row" spacing={2} sx={{
                    maxWidth: "100%",
                    overflowX: "scroll",
                    pb: 2
                }}>
                    {
                        [1, 2, 3, 4, 5, 6, 7].map((item) => (
                            <Button variant='outlined' size="small" sx={{
                                minWidth: "80px"
                            }}>Filter {item}</Button>
                        ))
                    }
                </Stack>
            </Grid>

            <Grid item container xs={12}
                mb={2}> {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <LocationCard id={item?.toString()} setSelectedLocation={setSelectedLocation} />
                    ))
                }</Grid>
            <Grid item container xs={12}> Pagination</Grid>


        </Grid>
    )
}

export default LocationList
