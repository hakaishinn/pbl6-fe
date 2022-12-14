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
                        if (res.message === 'Sai m???t kh???u') {
                            errorOldPasswordRef.current.innerHTML = 'M???t kh???u c?? kh??ng ????ng';
                            errorOldPasswordRef.current.style.opacity = 1;
                            oldPasswordRef.current.classList.add('error');
                        } else if (res.message === 'M???t kh???u m???i kh??ng gi???ng nhau') {
                            errorConfirmPasswordRef.current.innerHTML = 'Nh???p l???i m???t kh???u kh??ng ????ng';
                            errorConfirmPasswordRef.current.style.opacity = 1;
                            confirmPasswordRef.current.classList.add('error');
                        }
                    }
                    setIsLoading(false);
                }
            } else {
                confirmPasswordRef.current.classList.add('error');
                errorConfirmPasswordRef.current.style.opacity = 1;
                errorConfirmPasswordRef.current.innerHTML = 'Nh???p l???i m???t kh???u kh??ng ????ng';
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
                        <h2>?????i m???t kh???u</h2>
                        <button className={cx('close')} onClick={() => setIsChangePassword(false)}>
                            <CloseIcon></CloseIcon>
                        </button>
                    </div>
                </div>
                <div className={cx('form-body')}>
                    <div className={cx('form-input')}>
                        <label htmlFor="oldPassword">M???t kh???u c??: (*):</label>
                        <br></br>
                        <input
                            ref={oldPasswordRef}
                            type="password"
                            placeholder="Nh???p m???t kh???u c??"
                            id="oldPassword"
                            autoFocus
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        ></input>
                        <span ref={errorOldPasswordRef} className={cx('message-error')}>
                            Kh??ng ???????c ????? tr???ng tr?????ng n??y
                        </span>
                    </div>

                    <div className={cx('form-input')}>
                        <label htmlFor="newPassword">M???t kh???u m???i (*):</label>
                        <br></br>
                        <input
                            ref={newPasswordRef}
                            type="password"
                            placeholder="Nh???p m???t kh???u m???i:"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        ></input>
                        <span ref={errorNewPasswordRef} className={cx('message-error')}>
                            Kh??ng ???????c ????? tr???ng tr?????ng n??y
                        </span>
                    </div>

                    <div className={cx('form-input')}>
                        <label htmlFor="confirmPassword">Nh???p l???i m???t kh???u m???i (*):</label>
                        <br></br>
                        <input
                            ref={confirmPasswordRef}
                            type="password"
                            placeholder="Nh???p l???i m???t kh???u m???i:"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></input>
                        <span ref={errorConfirmPasswordRef} className={cx('message-error')}>
                            Kh??ng ???????c ????? tr???ng tr?????ng n??y
                        </span>
                    </div>
                    <button className={cx('btn-login')} onClick={handleChangePassword}>
                        ?????i m???t kh???u
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
