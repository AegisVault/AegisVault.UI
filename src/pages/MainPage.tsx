import { FunctionComponent } from 'preact';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { formLabelClasses } from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import { IconButton, IconButtonProps } from '@mui/joy';
import { useEffect, useState } from 'preact/hooks';
import logo from '../assets/Aegisvault_Logo_Circle.webp';
import vaulthex from "../assets/vaultHex.webp";
import vaultdoor from "../assets/vaultDoor.webp";

function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return <IconButton size="sm" variant="plain" color="neutral" disabled />;
    }
    return (

        <IconButton
            id="toggle-mode"
            size="sm"
            variant="plain"
            color="neutral"
            aria-label="toggle light/dark mode"
            {...props}
            onClick={(event: any) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
        >
            <img
                src={logo} // Make sure this is the correct path
                style={{
                    width: '100px',
                    height: '100px',
                    gridRow: '1 / 3', // Span two rows
                    gridColumn: '1', // Be in the first column
                }}
                alt="Logo"
            />
        </IconButton>
    );
}


const MainPage: FunctionComponent<{ title: string }> = ({ title, children }) => {
    return (
        <div class={title}>
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
                                display: 'grid',
                                gridTemplateColumns: 'auto auto', // Create two columns
                                gridTemplateRows: 'auto auto', // Create two rows
                                alignItems: 'center',
                                justifyContent: 'start', // Align items to the start
                                gap: '10px', // Optional: Add some gap between grid items
                            }}
                        >
                            <ColorSchemeToggle />

                            <Typography
                                fontSize="30px"
                                fontWeight="lg"
                                style={{
                                    gridRow: '1', // Be in the first row
                                    gridColumn: '2', // Be in the second column
                                }}
                            >
                                AegisVault
                            </Typography>
                            <Typography
                                style={{
                                    gridRow: '2', // Be in the second row
                                    gridColumn: '2', // Be in the second column
                                }}
                            >
                                Slightly better than typing out that long URL.
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
                                © AegisVault {new Date().getFullYear()} - Pigeon 🐦
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
                            `url(${vaultdoor})`,
                        [theme.getColorSchemeSelector('dark')]: {
                            backgroundImage:
                            `url(${vaulthex})`,
                        },
                    })}
                />
            </CssVarsProvider>
        </div>
    );
}

export default MainPage;