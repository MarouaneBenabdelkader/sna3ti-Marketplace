import '@/styles/globals.css';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '@/reduxFolder/store';
import Head from 'next/head'
import Router from 'next/router';
import NProgress from 'nprogress';
NProgress.configure({
  minimum: 0.2,
  easing: 'ease-in-out',
  speed: 500,
  template: `<div class="bar" role="bar" style="height: 4px; z-index: 9999;"></div>`,
});
Router.events.on('routeChangeStart', () => { NProgress.start() });
Router.events.on('routeChangeComplete', () => { NProgress.done() });
Router.events.on('routeChangeError', () => { NProgress.done() });


const theme = createTheme({
  palette: {
    primary: {
      main: '#fcb900'
    }
  }
})
export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head >
        <title>MyCraft</title>
        <link rel="icon" href="/icons/mainIcon.png" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>

          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Provider>

    </>
  )
}
