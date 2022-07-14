import { Header } from "../components/Header"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }) {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header />
            <Component { ...pageProps } />
        </ThemeProvider>
    );
}