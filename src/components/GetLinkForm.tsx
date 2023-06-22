
import { Button, FormControl, FormLabel, Box, Typography, Input, CircularProgress } from '@mui/joy';
import axios from 'axios';
import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { RETRIEVE_API_BASE } from '../api/V1LinkCreation';

interface RouteParams {
    id?: string,
    path: string
  }
  
const GetLinkForm: FunctionComponent<RouteParams> = (props) => {
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiSuccess, setApiSuccess] = useState<boolean | undefined>(undefined);

    const makeApiRequest = (password: string) => {
        setIsLoading(true);
        axios.post(RETRIEVE_API_BASE + 'v1/GetLink', {
            DisplayId: props.id,
            Password: password
        })
            .then(function (response) {
                // handle success
                setLink(response.data.Link);
                setIsLoading(false);
                setApiSuccess(true);
                window.location.replace(response.data.Link)
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
                        <Typography href={link}>Success, click here to open your link</Typography>
                        <Typography level='h4'>{link}</Typography>
                        <Button onClick={copyToClipboard}>Copy</Button>
                    </>
                    : <>
                        <div>
                            <div>
                                <Typography component="h1" fontSize="xl2" fontWeight="lg">
                                    Open Secure Link
                                </Typography>
                            </div>
                            {/* Added break in here due to user feedback */}
                            <br />
                            <form
                                onSubmit={(event: any) => {
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements;
                                    const data = {
                                        password: formElements.password.value,
                                    };
                                    makeApiRequest(data.password);
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
                <Typography>Loading...</Typography>
            </>}
        </>)
}

export default GetLinkForm; 