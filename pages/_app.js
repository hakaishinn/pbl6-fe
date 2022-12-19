import Head from 'next/head';
import { useEffect, useState } from 'react';

import AppProvider from '../context/appProvider';
import '../styles/globals.scss';
function MyApp({ Component, pageProps }) {
    return (
        <div className="root">
            <Head>
                <title>HIKARU SHOP</title>
                <link rel="shortcut icon" href="/images/favicon.png" />
            </Head>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </div>
    );
}

export default MyApp;
