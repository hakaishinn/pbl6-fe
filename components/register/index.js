import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import { CloseIcon } from '../Icons';
import styles from '/styles/register.module.scss';
import { AppContext } from '/context/appProvider.js';
import * as authServices from '/services/authServices';
import { Loading } from '../loading';
import validator from '/utils/validator';

const cx = classNames.bind(styles);

function Register() {
    const usernameRef = useRef();
    const errorUsernameRef = useRef();
    const passwordRef = useRef();
    const errorPasswordRef = useRef();
    const nameRef = useRef();
    const errorNameRef = useRef();
    const emailRef = useRef();
    const errorEmailRef = useRef();
    const conFirmRef = useRef();
    const errorConfirmRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [registerUser, setRegisterUser] = useState({
        username: '',
        password: '',
        confirm_password: '',
        name: '',
        email: '',
    });
    const { setIsShowLogin, setIsShowRegister } = useContext(AppContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        const isUsername = validator(usernameRef, errorUsernameRef, ['required']);
        const isName = validator(nameRef, errorNameRef, ['required']);
        const isEmail = validator(emailRef, errorEmailRef, ['required', 'email']);
        const isPassword = validator(passwordRef, errorPasswordRef, ['required']);

        if (isUsername && isName && isEmail && isPassword) {
            if (passwordRef.current?.value === conFirmRef.current?.value) {
                setIsLoading(true);
                const data = await authServices.register(registerUser);
                if (data && data.status === 'Success') {
                    setIsShowRegister(false);
                    setIsShowLogin(true);
                } else if (data && data.status === 'Error') {
                    errorUsernameRef.current.innerHTML = 'Tên tài khoản đã tồn tại';
                    errorUsernameRef.current.style.opacity = 1;
                    usernameRef.current.classList.add('error');
                }
                setIsLoading(false);
            } else {
                conFirmRef.current.classList.add('error');
                errorConfirmRef.current.style.opacity = 1;
                errorConfirmRef.current.innerHTML = 'Nhập lại mật khẩu không đúng';
            }
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
        }

        if (nameRef.current) {
            nameRef.current.addEventListener('blur', () => {
                validator(nameRef, errorNameRef, ['required']);
            });

            nameRef.current.addEventListener('input', () => {
                nameRef.current.classList.remove('error');
                errorNameRef.current.style.opacity = 0;
            });
        }

        if (emailRef.current) {
            emailRef.current.addEventListener('blur', () => {
                validator(emailRef, errorEmailRef, ['required', 'email']);
            });

            emailRef.current.addEventListener('input', () => {
                emailRef.current.classList.remove('error');
                errorEmailRef.current.style.opacity = 0;
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

        if (conFirmRef.current) {
            conFirmRef.current.addEventListener('blur', () => {
                validator(conFirmRef, errorConfirmRef, ['required']);
            });

            conFirmRef.current.addEventListener('input', () => {
                conFirmRef.current.classList.remove('error');
                errorConfirmRef.current.style.opacity = 0;
            });
        }
    }, [usernameRef.current, passwordRef.current]);

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
                            <label htmlFor="register-username">Tên đăng nhập (*):</label>
                            <br></br>
                            <input
                                ref={usernameRef}
                                placeholder="Username"
                                id="register-username"
                                autoFocus
                                value={registerUser?.username}
                                onChange={(e) => {
                                    setRegisterUser((prev) => ({ ...prev, username: e.target.value }));
                                }}
                            ></input>
                            <span ref={errorUsernameRef} className={cx('message-error')}>
                                Không được để trống trường này
                            </span>
                        </div>
                        <div className={cx('form-input')}>
                            <label htmlFor="register-name">Tên hiển thị (*):</label>
                            <br></br>
                            <input
                                ref={nameRef}
                                placeholder="Tên hiển thị"
                                id="register-name"
                                value={registerUser?.name}
                                onChange={(e) => {
                                    setRegisterUser((prev) => ({ ...prev, name: e.target.value }));
                                }}
                            ></input>
                            <span ref={errorNameRef} className={cx('message-error')}>
                                Không được để trống trường này
                            </span>
                        </div>
                        <div className={cx('form-input')}>
                            <label htmlFor="register-email">Email (*):</label>
                            <br></br>
                            <input
                                ref={emailRef}
                                placeholder="Email"
                                id="register-email"
                                value={registerUser?.email}
                                onChange={(e) => {
                                    setRegisterUser((prev) => ({ ...prev, email: e.target.value }));
                                }}
                            ></input>
                            <span ref={errorEmailRef} className={cx('message-error')}>
                                Không được để trống trường này
                            </span>
                        </div>
                        <div className={cx('form-input')}>
                            <label htmlFor="register-password">Mật khẩu (*):</label>
                            <br></br>
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder="Mật khẩu"
                                id="register-password"
                                value={registerUser?.password}
                                onChange={(e) => {
                                    setRegisterUser((prev) => ({ ...prev, password: e.target.value }));
                                }}
                            ></input>
                            <span ref={errorPasswordRef} className={cx('message-error')}>
                                Không được để trống trường này
                            </span>
                        </div>

                        <div className={cx('form-input')}>
                            <label htmlFor="register-confirm-password">Nhập lại mật khẩu (*):</label>
                            <br></br>
                            <input
                                ref={conFirmRef}
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                id="register-confirm-password"
                                value={registerUser?.confirm_password}
                                onChange={(e) => {
                                    setRegisterUser((prev) => ({ ...prev, confirm_password: e.target.value }));
                                }}
                            ></input>
                            <span ref={errorConfirmRef} className={cx('message-error')}>
                                Không được để trống trường này
                            </span>
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
