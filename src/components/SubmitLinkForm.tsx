
import { Button, FormControl, FormLabel, Box, Typography, Input, CircularProgress } from '@mui/joy';
import axios from 'axios';
import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { CREATE_API_BASE } from '../api/V1LinkCreation';

const SubmitLinkForm: FunctionComponent = () => {
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);

    const makeApiRequest = (url: string, password: string) => {
        setIsLoading(true);
        axios.post(CREATE_API_BASE + 'v1/CreateRedirectLink', {
            URL: url,
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
                        <Typography component="h1" href={link}>Success, click here to open your link</Typography>
                        <Typography component="h4">{link}</Typography>
                        <Button onClick={copyToClipboard}>Copy</Button>
                    </>
                    : <>
                        <div>
                            <div>
                                <Typography component="h1" fontSize="xl2" fontWeight="lg">
                                    Create Redirection Link
                                </Typography>
                            </div>
                            {/* Added break in here due to user feedback */}
                            <br />
                            <form
                                onSubmit={(event: any) => {
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements;
                                    const data = {
                                        url: formElements.url.value,
                                        password: formElements.password.value,
                                    };
                                    makeApiRequest(data.url, data.password);
                                }}
                            >
                                <FormControl required>
                                    <FormLabel>Url</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input name="url" />
                                </FormControl>
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
                                <Button color="info" type="submit" fullWidth>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </>
                : <>
                    <CircularProgress
                        color="neutral"
                        determinate={false}
                        size="lg"
                        value={25}
                        variant="solid"
                    />
                    <Typography>Loading...</Typography>
                </>}
        </>)
}

export default SubmitLinkForm; 
