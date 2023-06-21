import { FunctionComponent } from 'preact';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { formLabelClasses } from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import SubmitForm from '../components/GetLinkForm';




const MainPage: FunctionComponent<{title: string}> = ({title, children}) => {
    return (
        <div>
            <CssVarsProvider
                defaultMode="light"
                disableTransitionOnChange
            >
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        ':root': {
                            '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
                            '--Cover-width': '40vw', // must be `vw` only
                            '--Form-maxWidth': '700px',
                            '--Transition-duration': '0.4s', // set to `none` to disable transition
                        },
                    }}
                />
                <Box
                    sx={(theme) => ({
                        width:
                            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                        transition: 'width var(--Transition-duration)',
                        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                        position: 'relative',
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        backdropFilter: 'blur(4px)',
                        backgroundColor: 'rgba(255 255 255 / 0.6)',
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundColor: 'rgba(11 11 11 / 0.4)',
                        },
                    })}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100dvh',
                            width:
                                'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                            maxWidth: '100%',
                            px: 2,
                        }}
                    >
                        <Box
                            component="header"
                            sx={{
                                py: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography
                                fontWeight="lg"
                                startDecorator={
                                    <Box
                                        component="span"
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            background: (theme) =>
                                                `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
                                            borderRadius: '50%',
                                            boxShadow: (theme) => theme.shadow.md,
                                            '--joy-shadowChannel': (theme) =>
                                                theme.vars.palette.primary.mainChannel,
                                        }}
                                    />
                                }
                            >
                                AegisVault
                            </Typography>
                        </Box>
                        <Box
                            component="main"
                            sx={{
                                my: 'auto',
                                py: 2,
                                pb: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                width: 400,
                                maxWidth: '100%',
                                mx: 'auto',
                                borderRadius: 'sm',
                                '& form': {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                },
                                [`& .${formLabelClasses.asterisk}`]: {
                                    visibility: 'hidden',
                                },
                            }}
                        >
                            {children}
                        </Box>
                        <Box component="footer" sx={{ py: 3 }}>
                            <Typography level="body3" textAlign="center">
                                © AegisVault {new Date().getFullYear()}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={(theme) => ({
                        height: '100%',
                        position: 'fixed',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                        transition:
                            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                        transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                        backgroundColor: 'background.level1',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&w=1000&dpr=2)',
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundImage:
                                'url(https://images.unsplash.com/photo-1582135739786-3bceafcaea85?auto=format&w=1000&dpr=2)',
                        },
                    })}
                />
            </CssVarsProvider>
        </div>
    );
}

export default MainPage;