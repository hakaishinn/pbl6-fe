import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import * as authServices from '/services/authServices';
import * as cartServices from '/services/cartServices';
import { CloseIcon } from '../Icons';
import styles from '/styles/login.module.scss';
import { AppContext } from '/context/appProvider.js';
import {Loading} from '../loading';

const cx = classNames.bind(styles);

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setIsShowLogin, setIsShowRegister, setUser } = useContext(AppContext);

    const handleLogin = async () => {
        setIsLoading(true);
        const data = await authServices.login(username, password);

        if (data && data.status === 'Success') {
            const currentUser = await authServices.getUserByUsername(username);
            if (currentUser && currentUser.idUser) {
                localStorage.setItem(
                    'userToken',
                    JSON.stringify({
                        ...currentUser,
                        token: data.title,
                    }),
                );
                const cart = await cartServices.getCartByUserId(currentUser.idUser);
                if (cart.id === 0) {
                    await cartServices.createCartByUserId(currentUser.idUser);
                }
            }
            setUser({ ...currentUser, token: data.title });
            setIsShowLogin(false);
        }
        setIsLoading(false);
    };
    return (
        <>
            <div className={cx('overlay')} onClick={() => setIsShowLogin(false)}>
                <div className={cx('form-login')} onClick={(e) => e.stopPropagation()}>
                    <div className={cx('header')}>
                        <div className={cx('header-title')}>
                            <h2>Đăng nhập</h2>
                            <button className={cx('close')} onClick={() => setIsShowLogin(false)}>
                                <CloseIcon></CloseIcon>
                            </button>
                        </div>
                        <div>
                            <span>Bạn chưa có tài khoản? </span>
                            <button
                                onClick={() => {
                                    setIsShowLogin(false);
                                    setIsShowRegister(true);
                                }}
                            >
                                Đăng ký
                            </button>
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
                        <div className={cx('forgot-password')}>
                            <button>Quên mật khẩu</button>
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
