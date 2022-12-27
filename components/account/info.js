import classNames from 'classnames/bind';
import { useEffect, useState, useContext, useRef } from 'react';

import styles from '/styles/account/info.module.scss';
import { AppContext } from '/context/appProvider.js';

import * as authServices from '/services/authServices';
import { Loading } from '../loading';
import validator from '/utils/validator';
import ChangePassword from './changePassword';

const cx = classNames.bind(styles);

function Info({ className }) {
    const nameRef = useRef();
    const errorNameRef = useRef();
    const phoneRef = useRef();
    const errorPhoneRef = useRef();

    const { user, setUser } = useContext(AppContext);
    const [currentUser, setCurrentUser] = useState(user);
    const [isRef, setIsRef] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);

    const handleUpdate = async () => {
        const isName = validator(nameRef, errorNameRef, ['required']);
        const isPhone = validator(phoneRef, errorPhoneRef, ['required', 'phone']);

        if (isName && isPhone) {
            if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
                setIsLoading(true);
                const res = await authServices.updateUserById(currentUser);
                if (res && res.status === 'Success') {
                    localStorage.setItem('userToken', JSON.stringify(currentUser));
                    setUser(currentUser);
                    setIsUpdate(false);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    alert('Cập nhật thất bại');
                }
            } else {
                setIsUpdate(false);
            }
        }
    };

    useEffect(() => {
        setCurrentUser(user);
    }, [JSON.stringify(user)]);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.addEventListener('blur', () => {
                validator(nameRef, errorNameRef, ['required']);
            });

            nameRef.current.addEventListener('input', () => {
                nameRef.current.classList.remove('error');
                errorNameRef.current.style.opacity = 0;
            });
        } else {
            setIsRef(false);
        }

        if (phoneRef.current) {
            phoneRef.current.addEventListener('blur', () => {
                validator(phoneRef, errorPhoneRef, ['required', 'phone']);
            });

            phoneRef.current.addEventListener('input', () => {
                phoneRef.current.classList.remove('error');
                errorPhoneRef.current.style.opacity = 0;
            });
        }
    }, [nameRef.current, phoneRef.current]);

    return (
        <div className={className}>
            {isLoading && <Loading isOverlay={true}></Loading>}
            <h2 className={cx('title')}>Tài khoản của bạn</h2>
            {currentUser && (
                <div className={cx('wrapper')}>
                    <div className={cx('form-info')}>
                        <p>Tên hiển thị:</p>
                        {isUpdate ? (
                            <>
                                <input
                                    ref={nameRef}
                                    value={currentUser.name}
                                    onChange={(e) => setCurrentUser((prev) => ({ ...prev, name: e.target.value }))}
                                ></input>
                                <span ref={errorNameRef} className={cx('message-error')}>
                                    Không được để trống trường này
                                </span>
                            </>
                        ) : (
                            <span>{currentUser.name}</span>
                        )}
                    </div>
                    <div className={cx('form-info')}>
                        <p>Email:</p>
                        {isUpdate ? (
                            <p>
                                <input value={currentUser.email} disabled></input>
                                <span className={cx('message-error')}>Không được để trống trường này</span>
                            </p>
                        ) : (
                            <span>{currentUser.email}</span>
                        )}
                    </div>
                    <div className={cx('form-info')}>
                        <p>Số điện thoại:</p>
                        {isUpdate ? (
                            <>
                                <input
                                    ref={phoneRef}
                                    value={currentUser.contact}
                                    onChange={(e) => setCurrentUser((prev) => ({ ...prev, contact: e.target.value }))}
                                ></input>
                                <span ref={errorPhoneRef} className={cx('message-error')}>
                                    Không được để trống trường này
                                </span>
                            </>
                        ) : (
                            <span>{currentUser.contact}</span>
                        )}
                    </div>
                    <div className={cx('form-info')}>
                        <p>Địa chỉ:</p>
                        {isUpdate ? (
                            <textarea
                                value={currentUser.address}
                                onChange={(e) => setCurrentUser((prev) => ({ ...prev, address: e.target.value }))}
                            ></textarea>
                        ) : (
                            <span>{currentUser.address}</span>
                        )}
                    </div>

                    {isUpdate ? (
                        <>
                            <button onClick={handleUpdate}>Cập nhật</button>{' '}
                            <button
                                className={cx('danger')}
                                onClick={() => {
                                    setCurrentUser(user)
                                    setIsUpdate(false);
                                }}
                            >
                                Hủy
                            </button>
                        </>
                    ) : (
                        <div className={cx('btn-space')}>
                            <button onClick={() => setIsUpdate(true)}>Sửa</button>
                            <button className={cx('danger')} onClick={() => setIsChangePassword(true)}>
                                Đổi mật khẩu
                            </button>
                        </div>
                    )}
                </div>
            )}
            {isChangePassword && <ChangePassword setIsChangePassword={setIsChangePassword}></ChangePassword>}
        </div>
    );
}

export default Info;
