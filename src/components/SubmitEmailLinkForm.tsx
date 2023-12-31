
import { Button, FormControl, FormLabel, Typography, Input, Grid, Container, CircularProgress } from '@mui/joy';
import axios from 'axios';
import { FunctionComponent, ComponentChild } from 'preact';
import { useState } from 'preact/hooks';
import { CREATE_API_BASE } from '../api/V1LinkCreation';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

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
    Link: {
        Url: string;
        Password: string;
    };
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

const SubmitEmailLinkForm: FunctionComponent = () => {
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [brandDetailsOpen, setBrandDetailsOpen] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link)
    }

    const makeApiRequest = (data: FormDetails) => {
        setIsLoading(true);
        axios.post(CREATE_API_BASE + 'v1/CreateRedirectEmail', {
            brand: {
                brandname: data.brand.brandname,
                brandLogoUrl: data.brand.brandLogoUrl,
                brandPrimaryColor: data.brand.brandPrimaryColor,
                brandSecondaryColor: data.brand.brandSecondaryColor
            },
            Link: {
                Url: data.Link.Url,
                Password: data.Link.Password
            },
            DocumentType: data.DocumentType,
            RequiredContent: data.RequiredContent,
            Name: data.Name,
            Email: data.Email
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

    return (
<>
            {!isLoading ?
                apiSuccess
                    ? <>
                        <Typography onClick={copyToClipboard}>
                            Success. Your email should arrive within the next 5-10 minutes. (Normally before).
                            If needed, click below to copy the link</Typography>
                        <Typography level='h4'>{link}</Typography>
                        <Button onClick={copyToClipboard}>Copy</Button>
                    </>
                    : <>
                <Container>
                    <Typography component="h1" fontSize="xl2" fontWeight="lg">
                        Generate Email with Link {isLoading ? "" : ""} {apiSuccess ? "" : ""} {link}
                    </Typography>
                    <br />
                    <form
                        onSubmit={(event: any) => {
                            event.preventDefault();
                            const formElements = event.currentTarget.elements;
                            const data: FormDetails = {
                                Link: {
                                    Url: formElements.url.value,
                                    Password: formElements.password.value
                                },
                                Email: formElements.email.value,
                                Name: formElements.name.value,
                                DocumentType: formElements.documentType.value,
                                RequiredContent: formElements.requiredContent.value,
                                brand: {
                                    brandname: formElements.brandname.value === "" ? "Aegis Vault" : formElements.brandname.value,
                                    brandLogoUrl: formElements.brandLogoURL.value === "" ? "https://aegisvault.dev/assets/Aegisvault_Logo_Circle-2d5136d5.webp" : formElements.brandLogoURL.value,
                                    brandPrimaryColor: formElements.brandPrimaryColor.value === "" ? "#EF4C46" : formElements.brandPrimaryColor.value,
                                    brandSecondaryColor: formElements.brandSecondaryColor.value === "" ? "#394855" : formElements.brandSecondaryColor.value
                                }
                            };
                            makeApiRequest(data);
                        }}
                    >
                        <Grid container columnGap={3} spacing={2} sx={{ flexGrow: 1 }}>
                            <Grid item xs={12}>
                                <fieldset>
                                    <legend>Link Details</legend>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <FormControl required fullWidth>
                                                <FormLabel>URL</FormLabel>
                                                {/* @ts-ignore */}
                                                <Input name="url" />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl required fullWidth>
                                                <FormLabel>Password</FormLabel>
                                                {/* @ts-ignore */}
                                                <Input type="password" name="password" />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
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
                                        <FormControl>
                                            <FormLabel>Brand Name</FormLabel>
                                            {/* @ts-ignore */}
                                            <Input name="brandname" placeholder="Aegis Vault" />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Brand Logo URL</FormLabel>
                                            {/* @ts-ignore */}
                                            <Input name="brandLogoURL" placeholder="https://aegisvault.dev/assets/Aegisvault_Logo_Circle-2d5136d5.webp" />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Brand Primary Color</FormLabel>
                                            {/* @ts-ignore */}
                                            <Input name="brandPrimaryColor" placeholder="#EF4C46" />
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Brand Secondary Color</FormLabel>
                                            {/* @ts-ignore */}
                                            <Input name="brandSecondaryColor" placeholder="#394855" />
                                        </FormControl>
                                    </Collapse>
                                </fieldset>
                            </Grid>

                        </Grid>

                        <Button color="info" type="submit" fullWidth>
                            Submit
                        </Button>
                    </form>
                </Container>
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
        </>
    );
};

export default SubmitEmailLinkForm; 