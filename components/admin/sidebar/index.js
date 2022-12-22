import classNames from 'classnames/bind';
import Link from 'next/link';
import { useContext } from 'react';

import { UserIcon } from '../../Icons';
import styles from '/styles/admin/sidebar.module.scss';
import { AppContext } from '/context/appProvider.js';

const cx = classNames.bind(styles);

function Sidebar({ itemActive = '' }) {
    const { user, setUser, setIsShowLogin } = useContext(AppContext);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <UserIcon></UserIcon>
                <h4>{user?.name}</h4>
                <button
                    onClick={() => {
                        localStorage.removeItem('userToken')
                        setUser(null);
                    }}
                >
                    Đăng xuất
                </button>
            </div>
            <div className={cx('sidebar')}>
                <Link href="/admin" className={cx('item', { active: itemActive == '' })}>
                    Tổng Quan
                </Link>
                <Link href="/admin/products" className={cx('item', { active: itemActive == 'products' })}>
                    Sản Phẩm
                </Link>
                <Link href="/admin/category" className={cx('item', { active: itemActive == 'category' })}>
                    Thể Loại
                </Link>
                <Link href="/admin/users" className={cx('item', { active: itemActive == 'users' })}>
                    Người Dùng
                </Link>
                <Link href="/admin/bill" className={cx('item', { active: itemActive == 'bill' })}>
                    Đơn Hàng
                </Link>
                {/* <Link href="/admin/statistical" className={cx('item', { active: itemActive == 'statistical' })}>
                    Thống kê
                </Link> */}
            </div>
        </div>
    );
}

export default Sidebar;
