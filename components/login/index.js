import classNames from 'classnames/bind';
import { useContext } from 'react';

import { CloseIcon } from '../Icons';
import styles from '/styles/login.module.scss';
import { AppContext } from '/context/appProvider.js';

const cx = classNames.bind(styles);

function Login() {
    const { setIsShowLogin, setIsShowRegister } = useContext(AppContext);
    return (
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
                        <button onClick={() => {
                            setIsShowLogin(false)
                            setIsShowRegister(true)
                        }}>Đăng ký</button>
                    </div>
                </div>
                <div className={cx('form-body')}>
                    <div className={cx('form-input')}>
                        <label htmlFor="login-email">Email:</label>
                        <br></br>
                        <input placeholder="Nhập email" id="login-email" autoFocus></input>
                    </div>
                    <div className={cx('form-input')}>
                        <label htmlFor="login-password">Password:</label>
                        <br></br>
                        <input placeholder="Nhập mật khẩu" id="login-password"></input>
                    </div>
                    <div className={cx('forgot-password')}>
                        <button>Quên mật khẩu</button>
                    </div>
                    <button className={cx('btn-login')}>Đăng nhập</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
