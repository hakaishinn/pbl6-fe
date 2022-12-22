import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import Link from 'next/link';

import styles from '/styles/header/header.module.scss';
import Search from './Search';
import {UserIcon } from '../Icons';
import { useContext, memo } from 'react';
import { AppContext } from '/context/appProvider.js';
import Cart from './cart';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

function Header() {
    const { setIsShowLogin, user, setUser, setCartItem} = useContext(AppContext);
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        setUser(null)
        setCartItem([])
    }
    return (
        <div className={cx('header')}>
            <div className="container">
                <div className={cx('wrapper')}>
                    <Link href={'/'} className={cx('logo')}>
                        <img src='/images/logo.png'></img>
                    </Link>
                    <Search></Search>
                    <div className={cx('action')}>
                        <div>
                            <HeadlessTippy
                                offset={[0, 8]}
                                placement="bottom-end"
                                interactive
                                hideOnClick={false}
                                render={(attrs) => (
                                    <div className={cx('sub-account')} tabIndex="-1" {...attrs}>
                                        <ul>
                                            { user ? (
                                                <>
                                                    <li className={cx('sub-account-item')}>
                                                        <button onClick={() => router.push('/account')}>Tài khoản của tôi</button>
                                                    </li>
                                                    
                                                    <li className={cx('sub-account-item')}>
                                                        <button onClick={handleLogout}>Đăng xuất</button>
                                                    </li>
                                                </>
                                            ) : (
                                                <li className={cx('sub-account-item')}>
                                                    <button
                                                        onClick={() => {
                                                            setIsShowLogin(true);
                                                        }}
                                                    >
                                                        Đăng nhập
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            >
                                <div className={cx('action-item')}>
                                    <div className={cx('border')}>
                                        <UserIcon className={cx('icon')}></UserIcon>
                                    </div>
                                    <p>{user ? user.name : 'Tài khoản'}</p>
                                </div>
                            </HeadlessTippy>
                        </div>
                        <Cart></Cart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Header);
