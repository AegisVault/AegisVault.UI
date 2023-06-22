


import { Button, FormControl, FormLabel, Box, Typography, Input, CircularProgress } from '@mui/joy';
import axios from 'axios';
import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { RETRIEVE_API_BASE } from '../api/V1LinkCreation';

interface RouteParams {
    id?: string,
    path: string
}

const GetDocumentForm: FunctionComponent<RouteParams> = (props) => {
    const [link, setLink] = useState("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiSuccess, setApiSuccess] = useState<boolean | undefined>(undefined);

    const makeApiRequest = (password: string) => {
        setIsLoading(true);
        axios.post(RETRIEVE_API_BASE + "v2/GetDocument", {
            DisplayId: props.id,
            Password: password
        }, { responseType: 'blob' })
            .then(function (response) {
                // handle success
                setLink(response.data.Link);
                setIsLoading(false);
                setApiSuccess(true);
                const blob = response.data
                const url = window.URL.createObjectURL(blob);
                const cheekyLink = document.createElement('a');
                cheekyLink.style.display = 'none';
                cheekyLink.href = url;
                cheekyLink.download = response.headers["filename"];
                document.body.appendChild(cheekyLink);
                cheekyLink.click();
                window.URL.revokeObjectURL(url);
                alert('Your file has been downloaded!');
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLink("");
                setIsLoading(false);
                setApiSuccess(false);
            });
    }

    return (
        <>
            {!isLoading ?
                apiSuccess
                    ? <>
                        <h1 href={link}>Success, item has been downloaded</h1>
                        <h4>{link}</h4>
                        <Button onClick={(event: any) => {
                            event.preventDefault();
                            makeApiRequest(password);
                        }}>Re-Download</Button>
                    </>
                    : <>
                        <div>
                            <div>
                                <Typography component="h1" fontSize="xl2" fontWeight="lg">
                                    Open Document Link
                                </Typography>
                            </div>
                            <br />
                            <form
                                onSubmit={(event: any) => {
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements;
                                    const pass = formElements.password.value;
                                    setPassword(pass);
                                    makeApiRequest(pass);
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
                                {apiSuccess == false && apiSuccess != undefined &&
                                    <Typography color='danger'>
                                        Error: Password or Identifier incorrect. Please try again, or contact support.
                                    </Typography>
                                }
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
                <h1>Loading...</h1>
            </>}
        </>)
}

export default GetDocumentForm; 