import classNames from 'classnames/bind';
import styles from '/styles/account/account.module.scss';
import Order from './order';
import Info from './info';
import { AppContext } from '/context/appProvider.js';
import { useEffect, useState, useContext } from 'react';

const cx = classNames.bind(styles);
function Account() {
    const { user, setIsShowLogin } = useContext(AppContext);

    const [currentUser, setCurrentUser] = useState(user);

    useEffect(() => {
        setCurrentUser(user);
    }, [JSON.stringify(user)]);

    return (
        <div className="container">
            {!currentUser ? <h2 className={cx('Notification')}>Bạn cần đăng nhập để xem trang này</h2> : (
                <div className={cx('wrapper')}>
                    <Order className={cx('order')}></Order>
                    <Info className={cx('info')}></Info>
                </div>
            )}
        </div>
    );
}

export default Account;
