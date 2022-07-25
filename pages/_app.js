import { Header } from "../components/Header"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { LoggedInTeacherProvider } from "../context/LoggedInTeacherContext";

export default function App({ Component, pageProps }) {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <LoggedInTeacherProvider>
                <Header />
                <Component { ...pageProps } />
            </LoggedInTeacherProvider>
        </ThemeProvider>
    );
}