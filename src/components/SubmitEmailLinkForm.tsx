
import { Button, FormControl, FormLabel, Typography, Input, Grid, Container} from '@mui/joy';
import axios from 'axios';
import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { CREATE_API_BASE } from '../api/V1LinkCreation';


const SubmitEmailLinkForm: FunctionComponent = () => {
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);

    const makeApiRequest = (brand: string, link: string, documentType: string, requiredContent: string, name: string, email: string) => {
        setIsLoading(true);
        axios.post(CREATE_API_BASE + 'v1/CreateRedirectEmail', {
            brand,
            link,
            DocumentType: documentType,
            RequiredContent: requiredContent,
            Name: name,
            Email: email
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

    // const copyToClipboard = () => {
    //     navigator.clipboard.writeText(link)
    // }

    return (
        <>
            <Container>
                <Typography component="h1" fontSize="xl2" fontWeight="lg">
                    Generate Email with Link {isLoading ? "" : ""} {apiSuccess ? "" : ""} {link}
                </Typography>
                <br />
                <form
                    onSubmit={(event: any) => {
                        const formElements = event.currentTarget.elements;
                        const data = {
                            url: formElements.url.value,
                            password: formElements.password.value,
                            email: formElements.email.value,
                            name: formElements.name.value,
                            documentType: formElements.documentType.value,
                            requiredContent: formElements.requiredContent.value,
                            brandname: formElements.brandname.value,
                            brandlogoURL: formElements.brandlogoURL.value,
                            brandPrimaryColor: formElements.brandPrimaryColor.value,
                            brandSecondaryColor: formElements.brandSecondaryColor.value
                        };
                        makeApiRequest(data.brandname, data.url, data.documentType, data.requiredContent, data.name, data.email);
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
                                <legend>Other Details</legend>
                                <FormControl required >
                                    <FormLabel>Email</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input type="email" name="email" />
                                </FormControl>
                                <FormControl required >
                                    <FormLabel>Name</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input name="name" />
                                </FormControl>
                                <FormControl required >
                                    <FormLabel>Document Type</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input name="documentType" />
                                </FormControl>
                                <FormControl required >
                                    <FormLabel>Required Content</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input name="requiredContent" />
                                </FormControl>
                            </fieldset>
                        </Grid>
                        <Grid item xs={12}>
                            <fieldset>
                                <legend>Brand Details</legend>

                                <FormControl required>
                                    <FormLabel>Brand Name</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input name="brandname" />
                                </FormControl>



                                <FormControl required >
                                    <FormLabel>Brand Logo URL</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input name="brandlogoURL" />
                                </FormControl>


                                <FormControl required >
                                    <FormLabel>Brand Primary Color</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input name="brandPrimaryColor" />
                                </FormControl>


                                <FormControl required >
                                    <FormLabel>Brand Secondary Color</FormLabel>
                                    {/* @ts-ignore */}
                                    <Input name="brandSecondaryColor" />
                                </FormControl>

                            </fieldset>
                        </Grid>
                    </Grid>

                    <Button type="submit" fullWidth>
                        Submit
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default SubmitEmailLinkForm; 