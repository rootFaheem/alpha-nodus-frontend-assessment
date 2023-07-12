import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';

interface Props {
    id: string,
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
}


const LocationCard: React.FC<Props> = ({ id, setSelectedLocation }) => {
    return (
        <Card sx={{ minWidth: "100%", mb: 2, "&:hover": { cursor: "pointer" } }} onClick={() => setSelectedLocation(id)}>
            <CardContent>

                <Stack direction="row" justifyContent="space-between">

                    <Typography variant="h6" component="div">
                        First name Last Name
                    </Typography>
                    <Typography variant="body2" component="div" className='status'>
                        Active
                    </Typography>
                </Stack>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    4567773.90392020
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Stack direction="row" spacing={0.5}>
                            <CalendarMonthIcon fontSize='small' />
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                                Dec-12, 2023
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={0.5}>
                            <AccessTimeIcon fontSize='small' />

                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>12:30AM</Typography>
                        </Stack>

                    </Stack>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>10H</Typography>
                </Stack>

            </CardContent>

        </Card>
    );
}

export default LocationCard;