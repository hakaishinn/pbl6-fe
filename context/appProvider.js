import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

function AppProvider({ children }) {
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [isShowRegister, setIsShowRegister] = useState(false);
    const [quantityCart, setQuantityCart] = useState(0);
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider
            value={{
                isShowLogin,
                setIsShowLogin,
                isShowRegister,
                setIsShowRegister,
                quantityCart,
                setQuantityCart,
                user,
                setUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
