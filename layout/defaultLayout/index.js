import { useContext, useEffect } from 'react';

import Header from '../../components/header';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { AppContext } from '/context/appProvider.js';
import Login from '/components/login';
import Register from '/components/register';
import IconContact from '../../components/iconContact';

function DefaultLayout({ children }) {
    const { isShowLogin, isShowRegister, setUser, user } = useContext(AppContext);
    useEffect(() => {
        const getUserToken = async () => {
            const userToken = await JSON.parse(localStorage.getItem('userToken'));
            setUser(userToken);
        };
        if (!user) {
            getUserToken();
        }
    }, []);

    return (
        <>
            <Header></Header>
            <Navbar></Navbar>
            {children}
            <IconContact></IconContact>
            <Footer></Footer>
            {isShowLogin && <Login></Login>}
            {isShowRegister && <Register></Register>}
        </>
    );
}

export default DefaultLayout;
