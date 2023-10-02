import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';

export default function ButtonAppBar({ headingName }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <Link href="/">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" component="div">
                        {headingName}
                    </Typography>
                    <div style={{ width: "28px" }}></div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}