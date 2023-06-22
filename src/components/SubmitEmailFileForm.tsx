
import { Button, FormControl, FormLabel, Box, Typography, Input, Grid } from '@mui/joy';
import axios from 'axios';
import { ComponentChild, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { CREATE_API_BASE } from '../api/V1LinkCreation';
import Dropzone from 'react-dropzone';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

interface CollapseProps {
    in: boolean;
    children: ComponentChild;
}

interface FormDetails {
    brand: {
        brandname: string;
        brandLogoUrl: string;
        brandPrimaryColor: string;
        brandSecondaryColor: string;
    };
    Password: string;
    DocumentType: string;
    RequiredContent: string;
    Name: string;
    Email: string;
}

const Collapse: FunctionComponent<CollapseProps> = ({ in: isOpen, children }) => {
    const style = {
        maxHeight: isOpen ? "1000px" : "0px",
        transition: "max-height 0.5s ease-in-out",
        overflow: "hidden",
    };

    return <div style={style}>{children}</div>;
};

const SubmitEmailFileForm: FunctionComponent = () => {
    const [link, setLink] = useState<string>("");
    const [file, setFile] = useState<Array<File>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiSuccess, setApiSuccess] = useState<boolean>(false);
    const [brandDetailsOpen, setBrandDetailsOpen] = useState(false);


    const makeApiRequest = (data: FormDetails) => {
        setIsLoading(true);
        var formData = new FormData();
        formData.append("file", file[0]);
        formData.append("password", data.Password);
        formData.append("brandname", data.brand.brandname);
        formData.append("brandLogoURL", data.brand.brandLogoUrl);
        formData.append("brandPrimaryColor", data.brand.brandPrimaryColor);
        formData.append("brandSecondaryColor", data.brand.brandSecondaryColor);
        formData.append("DocumentType", data.DocumentType);
        formData.append("RequiredContent", data.RequiredContent);
        formData.append("Name", data.Name);
        formData.append("Email", data.Email);
        axios.post(CREATE_API_BASE + 'v2/CreateDocumentEmail', formData, {
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
                                    const data: FormDetails = {
                                        Password: formElements.password.value,
                                        Email: formElements.email.value,
                                        Name: formElements.name.value,
                                        DocumentType: formElements.documentType.value,
                                        RequiredContent: formElements.requiredContent.value,
                                        brand: {
                                            brandname: formElements.brandname.value,
                                            brandLogoUrl: formElements.brandLogoURL.value,
                                            brandPrimaryColor: formElements.brandPrimaryColor.value,
                                            brandSecondaryColor: formElements.brandSecondaryColor.value
                                        }
                                    };
                                    makeApiRequest(data);
                                }}
                            >
                                <Grid container columnGap={3} spacing={2} sx={{ flexGrow: 1 }}>
                                    <Grid item xs={12}>
                                        <fieldset>
                                            <legend>Link Details</legend>
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
                                        </fieldset>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <fieldset>
                                            <legend>Email Details</legend>
                                            <FormControl required >
                                                <FormLabel>Recipient Email</FormLabel>
                                                {/* @ts-ignore */}
                                                <Input type="email" name="email" />
                                            </FormControl>
                                            <FormControl required >
                                                <FormLabel>Recipient Name</FormLabel>
                                                {/* @ts-ignore */}
                                                <Input name="name" />
                                            </FormControl>
                                            <FormControl required >
                                                <FormLabel>Email Theme</FormLabel>
                                                {/* @ts-ignore */}
                                                <Input name="documentType" placeholder="Policy Renewal, Policy Cancellation" />
                                            </FormControl>
                                            <FormControl required >
                                                <FormLabel>Required Content</FormLabel>
                                                {/* @ts-ignore */}
                                                <Input name="requiredContent" placeholder="General ideas to convey on email." minRows={3}
                                                />
                                            </FormControl>
                                        </fieldset>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <fieldset>
                                            <legend onClick={() => setBrandDetailsOpen(!brandDetailsOpen)}>
                                                Brand Details - Default Set {brandDetailsOpen ? <KeyboardArrowUp fontSize="large" /> : <KeyboardArrowDown fontSize="large" />}
                                            </legend>
                                            <Collapse in={brandDetailsOpen}>
                                                <FormControl required>
                                                    <FormLabel>Brand Name</FormLabel>
                                                    {/* @ts-ignore */}
                                                    <Input name="brandname" defaultValue="Aegis Vault" />
                                                </FormControl>

                                                <FormControl required >
                                                    <FormLabel>Brand Logo URL</FormLabel>
                                                    {/* @ts-ignore */}
                                                    <Input name="brandLogoURL" defaultValue="https://media.discordapp.net/attachments/1120715800664358942/1121233267010580563/Aegisvault_Logo_Circle.png?width=749&height=749" />
                                                </FormControl>

                                                <FormControl required >
                                                    <FormLabel>Brand Primary Color</FormLabel>
                                                    {/* @ts-ignore */}
                                                    <Input name="brandPrimaryColor" defaultValue="#EF4C46" />
                                                </FormControl>

                                                <FormControl required >
                                                    <FormLabel>Brand Secondary Color</FormLabel>
                                                    {/* @ts-ignore */}
                                                    <Input name="brandSecondaryColor" defaultValue="#394855" />
                                                </FormControl>
                                            </Collapse>
                                        </fieldset>
                                    </Grid>

                                </Grid>

                                <Button color="info" type="submit" fullWidth>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </>
                : <h1>Loading...</h1>}
        </>)
}

export default SubmitEmailFileForm; 