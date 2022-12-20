import Head from 'next/head';

import AppProvider from '../context/appProvider';
import '../styles/globals.scss';
function MyApp({ Component, pageProps }) {
    return (
        <div className="root">
            <Head>
                <title>Hikaru Shop</title>
                <meta
                    name="description"
                    content="Web bán truyện tranh, light novel, truyện nguyên bộ, truyện trinh thám - kinh dị...và nhiều thể loại hay khác"
                ></meta>
                <meta property='og:title' content='Hikaru Shop'></meta>
                <link rel="shortcut icon" href="/images/favicon.png" />
            </Head>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </div>
    );
}

export default MyApp;
