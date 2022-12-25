import classNames from 'classnames/bind';
import { useState, useContext } from 'react';

import * as authServices from '/services/authServices';
import { CloseIcon } from '../../Icons';
import styles from '/styles/login.module.scss';
import {Loading} from '../../loading';
import { AppContext } from '/context/appProvider.js';


const cx = classNames.bind(styles);

function Login() {
    const { setUser, setIsShowLogin } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
   
    const handleLogin = async () => {
        setIsLoading(true);
        const data = await authServices.login(username, password);

        if (data && data.status === 'Success') {
            const user = await authServices.getUserByUsername(username);
            if (user && user.idUser && user.role === 'Admin') {
                localStorage.setItem(
                    'userToken',
                    JSON.stringify({
                        ...user,
                        token: data.title,
                    }),
                );
                setUser(user)
                setIsShowLogin(false);
            }
        }
        setIsLoading(false);
    };
    return (
        <>
            <div className={cx('overlay')}>
                <div className={cx('form-login')}>
                    <div className={cx('header')}>
                        <div className={cx('header-title')}>
                            <h2>Đăng nhập</h2>
                        </div>
                    </div>
                    <div className={cx('form-body')}>
                        <div className={cx('form-input')}>
                            <label htmlFor="login-username">Username:</label>
                            <br></br>
                            <input
                                placeholder="Nhập username"
                                id="login-username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>
                        </div>
                        <div className={cx('form-input')}>
                            <label htmlFor="login-password">Password:</label>
                            <br></br>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                        </div>
                        <button className={cx('btn-login')} onClick={handleLogin}>
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
            {isLoading && <Loading isOverlay></Loading>}
        </>
    );
}

export default Login;
