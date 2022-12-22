import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [isShowRegister, setIsShowRegister] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const getUserToken = async () => {
            console.log("provider>>>>>>", user);
            const userToken = await JSON.parse(localStorage.getItem('userToken'));
            setUser(userToken);
        };
        if (user === null) {
            getUserToken();
        }
    });

    return (
        <AppContext.Provider
            value={{
                isShowLogin,
                setIsShowLogin,
                isShowRegister,
                setIsShowRegister,
                cartItem,
                setCartItem,
                user,
                setUser
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
