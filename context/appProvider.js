import { createContext, useState } from 'react';
import Login from '../components/login';
import Register from '../components/register';

export const AppContext = createContext();

function AppProvider({children}) {
    const [isShowLogin, setIsShowLogin] = useState(false)
    const [isShowRegister, setIsShowRegister] = useState(false)
    return ( 
        <AppContext.Provider value={{
            isShowLogin,
            setIsShowLogin,
            isShowRegister,
            setIsShowRegister
        }}>
            {children}
            {isShowLogin && (<Login></Login>)}
            {isShowRegister && <Register></Register>}
        </AppContext.Provider>
     );
}

export default AppProvider;