import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import { CloseIcon } from '../Icons';
import styles from '/styles/register.module.scss';
import { AppContext } from '/context/appProvider.js';
import * as authServices from '/services/authServices';
import {Loading} from '../loading';

const cx = classNames.bind(styles);

function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [registerUser, setRegisterUser] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
    });
    const { setIsShowLogin, setIsShowRegister } = useContext(AppContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = await authServices.register(registerUser);
        if (data.status === 'Success') {
            setIsShowRegister(false);
            setIsShowLogin(true);
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className={cx('overlay')} onClick={() => setIsShowRegister(false)}>
                <form className={cx('form-register')} onClick={(e) => e.stopPropagation()} onSubmit={handleRegister}>
                    <div className={cx('header')}>
                        <div className={cx('header-title')}>
                            <h2>Đăng ký</h2>
                            <button className={cx('close')} onClick={() => setIsShowRegister(false)}>
                                <CloseIcon></CloseIcon>
                            </button>
                        </div>
                        <div>
                            <span>Bạn đã có tài khoản? </span>
                            <button
                                onClick={() => {
                                    setIsShowRegister(false);
                                    setIsShowLogin(true);
                                }}
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                    <div className={cx('form-body')}>
                        <div className={cx('form-input')}>
                            <label htmlFor="register-username">Username:</label>
                            <br></br>
                            <input
                                placeholder="Username"
                                id="register-username"
                                autoFocus
                                value={registerUser?.username}
                                onChange={(e) => {
                                    setRegisterUser((prev) => ({ ...prev, username: e.target.value }));
                                }}
                            ></input>
                        </div>
                        <div className={cx('form-input')}>
                            <label htmlFor="register-name">Tên hiển thị:</label>
                            <br></br>
                            <input
                                placeholder="Tên hiển thị"
                                id="register-name"
                                value={registerUser?.name}
                                onChange={(e) => {
                                    setRegisterUser((prev) => ({ ...prev, name: e.target.value }));
                                }}
                            ></input>
                        </div>
                        <div className={cx('form-input')}>
                            <label htmlFor="register-email">Email:</label>
                            <br></br>
                            <input
                                placeholder="Email"
                                id="register-email"
                                value={registerUser?.email}
                                onChange={(e) => {
                                    setRegisterUser((prev) => ({ ...prev, email: e.target.value }));
                                }}
                            ></input>
                        </div>
                        <div className={cx('form-input')}>
                            <label htmlFor="register-password">Password:</label>
                            <br></br>
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                id="register-password"
                                value={registerUser?.password}
                                onChange={(e) => {
                                    setRegisterUser((prev) => ({ ...prev, password: e.target.value }));
                                }}
                            ></input>
                        </div>
                        <button className={cx('btn-register')}>Đăng ký</button>
                    </div>
                </form>
            </div>
            {isLoading && <Loading isOverlay></Loading>}
        </>
    );
}

export default Register;
