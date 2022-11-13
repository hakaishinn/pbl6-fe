import Head from 'next/head';
import AppProvider from '../context/appProvider';
import '../styles/globals.scss';
function MyApp({ Component, pageProps }) {
    return (
        <AppProvider>
            <div className="root">
                <Head>
                    <title>HIKARU SHOP</title>
                    <link rel="shortcut icon" href="/images/favicon.png" />
                </Head>
                <Component {...pageProps} />
            </div>
        </AppProvider>
    );
}

export default MyApp;
