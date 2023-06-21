import { Button, FormControl, FormLabel, Box, Typography, Input } from '@mui/joy';
import axios from 'axios';
import { FunctionComponent, render } from 'preact';
import { useState } from 'preact/hooks';
import { RETRIEVE_API_BASE } from '../api/V1LinkCreation';

const HomePage: FunctionComponent = () => {
    return (
        <div style={{"display": "flex", "alignItems": "centre", "flexDirection": "column"}}>
            <h1>Welcome To AegisVault</h1>
            <Button size="lg">Create Link</Button>
            <br/>
            <Button size="lg" disabled>Create Document</Button>
        </div>
    );
}
export default HomePage;