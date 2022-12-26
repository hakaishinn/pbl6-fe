import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import * as authServices from '/services/authServices';
import * as cartServices from '/services/cartServices';
import { CloseIcon } from '../Icons';
import styles from '/styles/login.module.scss';
import { AppContext } from '/context/appProvider.js';
import { Loading } from '../loading';
import validator from '/utils/validator';

const cx = classNames.bind(styles);

function Login() {
    const usernameRef = useRef();
    const errorUsernameRef = useRef();
    const passwordRef = useRef();
    const errorPasswordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setIsShowLogin, setIsShowRegister, setUser } = useContext(AppContext);

    const handleLogin = async () => {
        const isUsername = validator(usernameRef, errorUsernameRef, ['required']);
        const isPassword = validator(passwordRef, errorPasswordRef, ['required']);
        if (isUsername && isPassword) {
            setIsLoading(true);
            const data = await authServices.login(username, password);
            if (data && data.status === 'Success') {
                localStorage.setItem(
                    'userToken',
                    JSON.stringify({
                        ...data.data,
                        token: data.title,
                    }),
                );
                const cart = await cartServices.getCartByUserId(data.data.idUser);
                if (cart.id === 0) {
                    await cartServices.createCartByUserId(data.data.idUser);
                }

                setUser({ ...data.data, token: data.title });
                setIsShowLogin(false);
            } else if (data && data.status === 'Error') {
                if (data.message === 'Username không tồn tại.') {
                    errorUsernameRef.current.innerHTML = 'Tên tài khoản không tồn tại';
                    errorUsernameRef.current.style.opacity = 1;
                    usernameRef.current.classList.add('error');
                } else if (data.message === 'Sai Password') {
                    errorPasswordRef.current.innerHTML = 'Mật khẩu không chính xác';
                    errorPasswordRef.current.style.opacity = 1;
                    passwordRef.current.classList.add('error');
                }
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('add event');
        if (usernameRef.current) {
            usernameRef.current.addEventListener('blur', () => {
                validator(usernameRef, errorUsernameRef, ['required']);
            });

            usernameRef.current.addEventListener('input', () => {
                usernameRef.current.classList.remove('error');
                errorUsernameRef.current.style.opacity = 0;
            });
        }

        if (passwordRef.current) {
            passwordRef.current.addEventListener('blur', () => {
                validator(passwordRef, errorPasswordRef, ['required']);
            });

            passwordRef.current.addEventListener('input', () => {
                passwordRef.current.classList.remove('error');
                errorPasswordRef.current.style.opacity = 0;
            });
        }
    }, [usernameRef.current, passwordRef.current]);
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
                            <label htmlFor="login-username">Tên đăng nhập (*):</label>
                            <br></br>
                            <input
                                ref={usernameRef}
                                placeholder="Nhập username"
                                id="login-username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            ></input>
                            <span ref={errorUsernameRef} className={cx('message-error')}>
                                Không được để trống trường này
                            </span>
                        </div>
                        <div className={cx('form-input')}>
                            <label htmlFor="login-password">Mật khẩu (*):</label>
                            <br></br>
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="Nhập mật khẩu"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <span ref={errorPasswordRef} className={cx('message-error')}>
                                Không được để trống trường này
                            </span>
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
