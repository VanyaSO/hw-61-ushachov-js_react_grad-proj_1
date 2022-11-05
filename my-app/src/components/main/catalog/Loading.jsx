import * as React from 'react';
import {memo} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircularIndeterminate = memo(() => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width:'100%' }}>
            <CircularProgress />
        </Box>
    );
})

export default CircularIndeterminate;
