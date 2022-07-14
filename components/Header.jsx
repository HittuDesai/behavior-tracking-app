import { AppBar, Avatar, Box, Button, Grid, IconButton, Typography } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LogoutIcon from '@mui/icons-material/Logout';

export function Header() {
    const currentUserID = "1";

    const HeaderWithoutSession = () => (
        <AppBar position="static" sx={{marginBottom: "1rem"}}>
            <Grid container direction="row" alignItems="center" justifyContent="space-between" padding="1rem">
                <PsychologyIcon fontSize='large' />
                <Typography variant='overline' fontSize="large">Behavior Tracking App</Typography>
            </Grid>
        </AppBar>
    );

    const handleSignOut = () => {
        // signOut(auth).then(() => {
        //     router.push("/");
        // })
        console.log("Signed Out");
    }

    const WithSessionRight = () => (
        <Box>
            <Grid container direction="row" alignItems="center" justifyContent="center">
                <IconButton onClick={() => {
                    // router.push(`/${currentUsername}/profile`);
                    console.log("Redirecting You To Profile");
                }}>
                    <Avatar />
                </IconButton>
                <IconButton onClick={handleSignOut}>
                    <LogoutIcon fontSize='large' />
                </IconButton>
            </Grid>
        </Box>
    );

    const HeaderWithSession = () => (
        <AppBar position="static" sx={{marginBottom: "1rem"}}>
            <Grid container direction="row" alignItems="center" justifyContent="space-between" padding="1rem">
                <PsychologyIcon fontSize='large' />
                <WithSessionRight />
            </Grid>
        </AppBar>
    );

    return (
        <>
        { currentUserID ? <HeaderWithSession /> : <HeaderWithoutSession />}
        </>
    );
}