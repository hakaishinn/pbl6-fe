import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import styles from '/styles/checkouts/information.module.scss';
import { AppContext } from '/context/appProvider.js';
import { UserIcon } from '../Icons';
import * as orderServices from '/services/orderServices';
import { useRouter } from 'next/router';
import { Loading } from '../loading';

const cx = classNames.bind(styles);
function Information({ className }) {
    const router = useRouter();
    const { user, setCartItem } = useContext(AppContext);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [method, setMethod] = useState('order');
    const [isLoading, setIsLoading] = useState(false);

    const handleOrderOrPay = async () => {
        if (method === 'order') {
            setIsLoading(true);
            const res = await orderServices.createOrders(user.idUser, address, phone);
            if (res && res.status === 'Success') {
                setCartItem([]);
                router.push('/account');
            }
            setIsLoading(false);
        }
    };

    return (
        <div className={className}>
            {isLoading && <Loading isOverlay={true}></Loading>}
            <h2 className={cx('title')}>Thông tin giao hàng</h2>
            <div className={cx('user')}>
                <div className={cx('avatar')}>
                    <UserIcon></UserIcon>
                </div>

                <div className={cx('name')}>
                    {user?.name}({user?.email})
                </div>
            </div>
            <input
                className={cx('input')}
                value={address}
                placeholder="Địa chỉ"
                onChange={(e) => setAddress(e.target.value)}
            ></input>
            <input
                className={cx('input')}
                value={phone}
                placeholder="Số điện thoại"
                onChange={(e) => setPhone(e.target.value)}
            ></input>
            <div className={cx('method')} onChange={(e) => setMethod(e.target.value)}>
                <h3>Phương thức thanh toán</h3>
                <div className={cx('form-input')}>
                    <input type={'radio'} id={'cash'} value={'order'} name={'method'} defaultChecked></input>
                    <label htmlFor="cash">Thanh toán khi nhận hàng</label>
                </div>
                <div className={cx('form-input')}>
                    <input type={'radio'} id={'vnpay'} value={'order-pay'} name={'method'}></input>
                    <label htmlFor="vnpay">Thanh toán bằng VN-Pay</label>
                </div>
            </div>
            <button className={cx('btn-pay')} onClick={handleOrderOrPay}>
                {method === 'order' ? 'Đặt hàng' : 'Đặt hàng và Thanh toán'}
            </button>
        </div>
    );
}

export default Information;
