import { useEffect } from 'react';
import Sidebar from '../../components/admin/sidebar';
import { AppContext } from '/context/appProvider.js';
import { useContext } from 'react';
import Login from '../../components/admin/login';

function AdminLayout({ children, itemActive }) {
    const { user, setUser, isShowLogin, setIsShowLogin } = useContext(AppContext);

    useEffect(() => {
        document.body.style.background = '#f0f2f5';
    }, []);

    useEffect(() => {
        const getUserToken = async () => {
            console.log('provider>>>>>>', user);
            const userToken = await JSON.parse(localStorage.getItem('userToken'));
            setUser(userToken);
        };
        if (user === null) {
            getUserToken();
        }
    }, []);

    useEffect(() => {
        if (user && user.role === 'Admin') {
            setIsShowLogin(false);
        } else {
            setIsShowLogin(true);
        }
    }, [JSON.stringify(user)]);
    return (
        <div>
            {!isShowLogin ? (
                <>
                    {' '}
                    <Sidebar itemActive={itemActive}></Sidebar>
                    {children}
                </>
            ) : (
                <Login></Login>
            )}
        </div>
    );
}

export default AdminLayout;
