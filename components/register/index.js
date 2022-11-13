import classNames from 'classnames/bind';
import { useContext } from 'react';

import { CloseIcon } from '../Icons';
import styles from '/styles/register.module.scss';
import { AppContext } from '/context/appProvider.js';

const cx = classNames.bind(styles);

function Register() {
    const { setIsShowLogin, setIsShowRegister } = useContext(AppContext);
    return (
        <div className={cx('overlay')} onClick={() => setIsShowRegister(false)}>
            <div className={cx('form-register')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header')}>
                    <div className={cx('header-title')}>
                        <h2>Đăng ký</h2>
                        <button className={cx('close')} onClick={() => setIsShowRegister(false)}>
                            <CloseIcon></CloseIcon>
                        </button>
                    </div>
                    <div>
                        <span>Bạn đã có tài khoản? </span>
                        <button onClick={() => {
                            setIsShowRegister(false)
                            setIsShowLogin(true)
                        }}>Đăng nhập</button>
                    </div>
                </div>
                <div className={cx('form-body')}>
                <div className={cx('form-input')}>
                        <label htmlFor="register-first-name">Tên:</label>
                        <br></br>
                        <input placeholder="Tên" id="register-first-name" autoFocus></input>
                    </div>
                    <div className={cx('form-input')}>
                        <label htmlFor="register-last-name">Họ:</label>
                        <br></br>
                        <input placeholder="Họ" id="register-last-name"></input>
                    </div>
                    <div className={cx('form-input')}>
                        <label htmlFor="register-email">Email:</label>
                        <br></br>
                        <input placeholder="Email" id="register-email"></input>
                    </div>
                    <div className={cx('form-input')}>
                        <label htmlFor="register-password">Password:</label>
                        <br></br>
                        <input placeholder="Mật khẩu" id="register-password"></input>
                    </div>
                    <button className={cx('btn-register')}>Đăng ký</button>
                </div>
            </div>
        </div>
    );
}

export default Register;
