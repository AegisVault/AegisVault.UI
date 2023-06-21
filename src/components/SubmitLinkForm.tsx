
import { Button, FormControl, FormLabel, Box, Typography, Input } from '@mui/joy';
import axios from 'axios';
import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { RETRIEVE_API_BASE } from '../api/V1LinkCreation';

const SubmitForm: FunctionComponent = () => {
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);

    const makeApiRequest = (id: string, password: string) => {
        setIsLoading(true);
        axios.post(RETRIEVE_API_BASE + 'v1/CreateLink', {
            Id: id,
            Password: password
        })
        .then(function (response) {
            // handle success
            setLink(response.data.Link);
            setIsLoading(false);
            setApiSuccess(true);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            setLink("");
            setIsLoading(false);
            setApiSuccess(false);
        });
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link)
    }

    return (
        <>
            {!isLoading ?
                apiSuccess
                    ? <>
                        <h1 href={link}>Success, click here to open your link</h1>
                        <h4>{link}</h4>
                        <Button onClick={copyToClipboard}>Copy</Button>
                    </>
                    : <>
                        <div>
                            <div>
                                <Typography component="h1" fontSize="xl2" fontWeight="lg">
                                    Open Document Link
                                </Typography>
                            </div>
                            {/* Added break in here due to user feedback */}
                            <br />
                            <form
                                onSubmit={(event: any) => {
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements;
                                    debugger;
                                    const data = {
                                        password: formElements.password.value,
                                    };
                                    makeApiRequest("abc", data.password);
                                    alert(JSON.stringify(data, null, 2));
                                }}
                            >
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input type="password" name="password" />
                                </FormControl>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                </Box>
                                <Button type="submit" fullWidth>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </>
                : <h1>Loading...</h1>}
        </>)
}

export default SubmitForm; 