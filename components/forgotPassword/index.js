import classNames from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';

import styles from '/styles/login.module.scss';
import validator from '/utils/validator';
import * as authServices from '/services/authServices';
import { CloseIcon } from '../Icons';
import { Loading } from '../loading';

const cx = classNames.bind(styles);

function ForgotPassword({ setIsForgot }) {
    const emailRef = useRef();
    const errorEmailRef = useRef();

    const [email, setEmail] = useState('');
    const [isRef, setIsRef] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        const isEmail = validator(emailRef, errorEmailRef, ['required', 'email']);

        if (isEmail) {
            setIsLoading(true);
            const res = await authServices.sendPasswordToEmail(email);
            if (res && res.status === 'Success') {
                setIsLoading(false);
                alert('Mật khẩu đã được gửi tới email của bạn');
                setIsForgot(false);
            } else {
                setIsLoading(false);
                alert('Có thể email không đúng hoặc không tồn tại');
            }
        }
    };

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.addEventListener('blur', () => {
                validator(emailRef, errorEmailRef, ['required', 'email']);
            });

            emailRef.current.addEventListener('input', () => {
                emailRef.current.classList.remove('error');
                errorEmailRef.current.style.opacity = 0;
            });
        } else {
            setIsRef(true);
        }
    }, [emailRef.current]);
    return (
        <div className={cx('overlay')} onClick={() => setIsForgot(false)}>
            <div className={cx('form-login')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header')}>
                    <div className={cx('header-title')}>
                        <h2>Quên mật khẩu</h2>
                        <button className={cx('close')} onClick={() => setIsForgot(false)}>
                            <CloseIcon></CloseIcon>
                        </button>
                    </div>
                </div>
                <div className={cx('form-body')}>
                    <div className={cx('form-input')}>
                        <label htmlFor="email">Nhập email (*):</label>
                        <br></br>
                        <input
                            ref={emailRef}
                            placeholder="Nhập email"
                            id="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <span ref={errorEmailRef} className={cx('message-error')}>
                            Không được để trống trường này
                        </span>
                    </div>
                    <button className={cx('btn-login')} onClick={handleSend}>
                        Gửi mật khẩu qua email
                    </button>
                </div>
            </div>
            {isLoading && <Loading isOverlay={true}></Loading>}
        </div>
    );
}

export default ForgotPassword;
