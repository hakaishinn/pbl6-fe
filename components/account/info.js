import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';

import styles from '/styles/account/info.module.scss';
import { AppContext } from '/context/appProvider.js';

import * as authServices from '/services/authServices'


const cx = classNames.bind(styles);

function Info({ className }) {
    const { user, setUser } = useContext(AppContext);
    const [currentUser, setCurrentUser] = useState(user);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleUpdate = async() => {
        const res = await authServices.updateUserById(currentUser)
        if(res && res.status === 'Success'){
            alert("Cập nhật thành công")
            localStorage.setItem('userToken', JSON.stringify(currentUser))
            setUser(currentUser)
            setIsUpdate(false)
            
        } else {
            alert('Cập nhật thất bại')
        }
    };

    useEffect(() => {
        setCurrentUser(user);
    }, [JSON.stringify(user)]);

    return (
        <div className={className}>
            <h2 className={cx('title')}>Tài khoản của bạn</h2>
            {currentUser && (
                <div className={cx('wrapper')}>
                    <div className={cx('form-info')}>
                        <p>Tên hiển thị:</p>
                        {isUpdate ? (
                            <input
                                value={currentUser.name}
                                onChange={(e) => setCurrentUser((prev) => ({ ...prev, name: e.target.value }))}
                            ></input>
                        ) : (
                            <span>{currentUser.name}</span>
                        )}
                    </div>
                    <div className={cx('form-info')}>
                        <p>Email:</p>
                        {isUpdate ? (
                            <input
                                value={currentUser.email}
                                onChange={(e) => setCurrentUser((prev) => ({ ...prev, email: e.target.value }))}
                            ></input>
                        ) : (
                            <span>{currentUser.email}</span>
                        )}
                    </div>
                    <div className={cx('form-info')}>
                        <p>Số điện thoại:</p>
                        {isUpdate ? (
                            <input
                                value={currentUser.contact}
                                onChange={(e) => setCurrentUser((prev) => ({ ...prev, contact: e.target.value }))}
                            ></input>
                        ) : (
                            <span>{currentUser.contact}</span>
                        )}
                    </div>
                    <div className={cx('form-info')}>
                        <p>Địa chỉ:</p>
                        {isUpdate ? (
                            <input
                                value={currentUser.address}
                                onChange={(e) => setCurrentUser((prev) => ({ ...prev, address: e.target.value }))}
                            ></input>
                        ) : (
                            <span>{currentUser.address}</span>
                        )}
                    </div>

                    {isUpdate ? (
                        <>
                            <button onClick={handleUpdate}>Cập nhật</button>{' '}
                            <button onClick={() => setIsUpdate(false)}>Hủy</button>
                        </>
                    ) : (
                        <button onClick={() => setIsUpdate(true)}>Sửa</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Info;
