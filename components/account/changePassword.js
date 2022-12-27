import classNames from 'classnames/bind';
import { useEffect, useRef, useState, useContext } from 'react';

import styles from '/styles/account/changePassword.module.scss';
import { CloseIcon } from '../Icons';
import validator from '/utils/validator';
import * as authServices from '/services/authServices';
import { AppContext } from '/context/appProvider.js';
import { Loading } from '../loading';

const cx = classNames.bind(styles);
function ChangePassword({ setIsChangePassword }) {
    const { user } = useContext(AppContext);

    const oldPasswordRef = useRef();
    const errorOldPasswordRef = useRef();

    const newPasswordRef = useRef();
    const errorNewPasswordRef = useRef();

    const confirmPasswordRef = useRef();
    const errorConfirmPasswordRef = useRef();

    const [isRef, setIsRef] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async () => {
        const isOldPassword = validator(oldPasswordRef, errorOldPasswordRef, ['required']);
        const isNewPassword = validator(newPasswordRef, errorNewPasswordRef, ['required']);
        const isConfirmPassword = validator(confirmPasswordRef, errorConfirmPasswordRef, ['required']);

        if (isOldPassword && isNewPassword && isConfirmPassword) {
            if (newPasswordRef.current?.value === confirmPasswordRef.current?.value) {
                if (user) {
                    setIsLoading(true);
                    const res = await authServices.changePassword(
                        user.idUser,
                        oldPassword,
                        newPassword,
                        confirmPassword,
                    );
                    if (res && res.status === 'Success') {
                        setIsChangePassword(false);
                    } else if (res && res.status === 'Error') {
                        if (res.message === 'Sai mật khẩu') {
                            errorOldPasswordRef.current.innerHTML = 'Mật khẩu cũ không đúng';
                            errorOldPasswordRef.current.style.opacity = 1;
                            oldPasswordRef.current.classList.add('error');
                        } else if (res.message === 'Mật khẩu mới không giống nhau') {
                            errorConfirmPasswordRef.current.innerHTML = 'Nhập lại mật khẩu không đúng';
                            errorConfirmPasswordRef.current.style.opacity = 1;
                            confirmPasswordRef.current.classList.add('error');
                        }
                    }
                    setIsLoading(false);
                }
            } else {
                confirmPasswordRef.current.classList.add('error');
                errorConfirmPasswordRef.current.style.opacity = 1;
                errorConfirmPasswordRef.current.innerHTML = 'Nhập lại mật khẩu không đúng';
            }
        }
    };

    useEffect(() => {
        if (oldPasswordRef.current) {
            oldPasswordRef.current.addEventListener('blur', () => {
                validator(oldPasswordRef, errorOldPasswordRef, ['required']);
            });

            oldPasswordRef.current.addEventListener('input', () => {
                oldPasswordRef.current.classList.remove('error');
                errorOldPasswordRef.current.style.opacity = 0;
            });
        } else {
            setIsRef(true);
        }

        if (newPasswordRef.current) {
            newPasswordRef.current.addEventListener('blur', () => {
                validator(newPasswordRef, errorNewPasswordRef, ['required']);
            });

            newPasswordRef.current.addEventListener('input', () => {
                newPasswordRef.current.classList.remove('error');
                errorNewPasswordRef.current.style.opacity = 0;
            });
        }

        if (confirmPasswordRef.current) {
            confirmPasswordRef.current.addEventListener('blur', () => {
                validator(confirmPasswordRef, errorConfirmPasswordRef, ['required']);
            });

            confirmPasswordRef.current.addEventListener('input', () => {
                confirmPasswordRef.current.classList.remove('error');
                errorConfirmPasswordRef.current.style.opacity = 0;
            });
        }
    }, [oldPasswordRef.current]);

    return (
        <div className={cx('overlay')} onClick={() => setIsChangePassword(false)}>
            {isLoading && <Loading isOverlay={true}></Loading>}
            <div className={cx('form-login')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header')}>
                    <div className={cx('header-title')}>
                        <h2>Đổi mật khẩu</h2>
                        <button className={cx('close')} onClick={() => setIsChangePassword(false)}>
                            <CloseIcon></CloseIcon>
                        </button>
                    </div>
                </div>
                <div className={cx('form-body')}>
                    <div className={cx('form-input')}>
                        <label htmlFor="oldPassword">Mật khẩu cũ: (*):</label>
                        <br></br>
                        <input
                            ref={oldPasswordRef}
                            placeholder="Nhập mật khẩu cũ"
                            id="oldPassword"
                            autoFocus
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        ></input>
                        <span ref={errorOldPasswordRef} className={cx('message-error')}>
                            Không được để trống trường này
                        </span>
                    </div>

                    <div className={cx('form-input')}>
                        <label htmlFor="newPassword">Mật khẩu mới (*):</label>
                        <br></br>
                        <input
                            ref={newPasswordRef}
                            placeholder="Nhập mật khẩu mới:"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        ></input>
                        <span ref={errorNewPasswordRef} className={cx('message-error')}>
                            Không được để trống trường này
                        </span>
                    </div>

                    <div className={cx('form-input')}>
                        <label htmlFor="confirmPassword">Nhập lại mật khẩu mới (*):</label>
                        <br></br>
                        <input
                            ref={confirmPasswordRef}
                            placeholder="Nhập lại mật khẩu mới:"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                        <span ref={errorConfirmPasswordRef} className={cx('message-error')}>
                            Không được để trống trường này
                        </span>
                    </div>
                    <button className={cx('btn-login')} onClick={handleChangePassword}>
                        Đổi mật khẩu
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
