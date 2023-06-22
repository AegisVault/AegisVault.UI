
import { Button, FormControl, FormLabel, Box, Typography, Input } from '@mui/joy';
import axios from 'axios';
import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { CREATE_API_BASE } from '../api/V1LinkCreation';
import Dropzone from 'react-dropzone';

const SubmitFileForm: FunctionComponent = () => {
    const [link, setLink] = useState<string>("");
    const [file, setFile] = useState<Array<File>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiSuccess, setApiSuccess] = useState<boolean>(false);

    const makeApiRequest = (password: string) => {
        setIsLoading(true);
        var formData = new FormData();
        formData.append("file", file[0]);
        formData.append("password", password);
        axios.post(CREATE_API_BASE + 'v1/CreateFileLink', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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

    const onDropHandler = (fileData: File[]) => {
        setFile(fileData);
    }

    return (
        <>
            {!isLoading ?
                apiSuccess
                    ? <>
                        <h1 onClick={copyToClipboard}>Success, click here to copy your link</h1>
                        <h4>{link}</h4>
                        <Button onClick={copyToClipboard}>Copy</Button>
                    </>
                    : <>
                        <div>
                            <div>
                                <Typography component="h1" fontSize="xl2" fontWeight="lg">
                                    Upload File
                                </Typography>
                            </div>
                            {/* Added break in here due to user feedback */}
                            <br />
                            <form
                                onSubmit={(event: any) => {
                                    event.preventDefault();
                                    const formElements = event.currentTarget.elements;
                                    makeApiRequest(formElements.password.value);
                                }}
                            >
                                <FormControl required>
                                    <FormLabel>File</FormLabel>
                                    {/* @ts-ignore */}
                                    <Dropzone
                                        onDrop={onDropHandler}
                                        maxFiles={1}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                {/* @ts-ignore */}
                                                <div {...getRootProps({ className: `dropzone${file.length >= 1 ? 'filled' : 'unfilled'}` })}>
                                                    {/* @ts-ignore */}
                                                    <input {...getInputProps()} />
                                                    <p>{file.length >= 1 ? `Drag and drop or click to replace: "${file[0].name}"` : 'Drag and drop or click here to upload'}</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
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
                : <h1>Loading...</h1>}
        </>)
}

export default SubmitFileForm; 