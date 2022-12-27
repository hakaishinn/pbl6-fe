import classNames from 'classnames/bind';
import { useState, useContext, useRef, useEffect } from 'react';

import * as authServices from '/services/authServices';
import { Loading } from '../../loading';
import { AppContext } from '/context/appProvider.js';
import validator from '/utils/validator';
import styles from '/styles/login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const usernameRef = useRef();
    const errorUsernameRef = useRef();
    const passwordRef = useRef();
    const errorPasswordRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isRef, setIsRef] = useState(true);

    const { setUser, setIsShowLogin } = useContext(AppContext);

    const handleLogin = async () => {
        const isUsername = validator(usernameRef, errorUsernameRef, ['required']);
        const isPassword = validator(passwordRef, errorPasswordRef, ['required']);

        if (isUsername && isPassword) {
            setIsLoading(true);
            const data = await authServices.login(username, password);
            if (data && data.status === 'Success') {
                if (data.data.role === 'Admin') {
                    localStorage.setItem(
                        'userToken',
                        JSON.stringify({
                            ...data.data,
                            token: data.title,
                        }),
                    );
                    setUser(data.data);
                    setIsShowLogin(false);
                } else {
                    errorUsernameRef.current.innerHTML = 'Không phải Admin';
                    errorUsernameRef.current.style.opacity = 1;
                    usernameRef.current.classList.add('error');
                }
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
        if (usernameRef.current) {
            usernameRef.current.addEventListener('blur', () => {
                validator(usernameRef, errorUsernameRef, ['required']);
            });

            usernameRef.current.addEventListener('input', () => {
                usernameRef.current.classList.remove('error');
                errorUsernameRef.current.style.opacity = 0;
            });
        } else {
            setIsRef(false);
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
            <div className={cx('overlay')}>
                <div className={cx('form-login')}>
                    <div className={cx('header')}>
                        <div className={cx('header-title')}>
                            <h2>Đăng nhập</h2>
                        </div>
                    </div>
                    <div className={cx('form-body')}>
                        <div className={cx('form-input')}>
                            <label htmlFor="login-username">Tên đăng nhập:</label>
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
                            <label htmlFor="login-password">Mật khẩu:</label>
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
