import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from '/styles/checkouts/information.module.scss';
import { AppContext } from '/context/appProvider.js';
import { UserIcon } from '../Icons';
import * as orderServices from '/services/orderServices';
import { useRouter } from 'next/router';
import { Loading } from '../loading';
import validator from '/utils/validator';

const cx = classNames.bind(styles);
function Information({ className }) {
    const router = useRouter();
    const { user, setCartItem, cartItem } = useContext(AppContext);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [method, setMethod] = useState('order');
    const [isLoading, setIsLoading] = useState(false);

    const addressRef = useRef();
    const errorAddressRef = useRef();
    const phoneRef = useRef();
    const errorPhoneRef = useRef();

    const total = () => {
        var total;
        if (cartItem && cartItem?.length > 0) {
            total = cartItem.reduce(
                (acc, item) =>
                    acc + (item.product.price - item.product.price * item.product.discount) * item.quantityCart,
                0,
            );
        }
        return total ? total : 0;
    };

    const handleOrderOrPay = async () => {
        const isAddress = validator(addressRef, errorAddressRef, ['required']);
        const isPhone = validator(phoneRef, errorPhoneRef, ['required', 'phone']);

        if (isAddress && isPhone) {
            if (method === 'order') {
                setIsLoading(true);
                const res = await orderServices.createOrders(user.idUser, address, phone);
                if (res && res.status === 'Success') {
                    setCartItem([]);
                    router.push('/account');
                }
                setIsLoading(false);
            } else {
                setIsLoading(true);
                const res = await orderServices.createOrders(user.idUser, address, phone);
                if (res && res.status === 'Success') {
                    setCartItem([]);
                    router.push({
                        pathname: '/vnpay/create',
                        query: { id: res.data.idOrder, price: total() },
                    });
                }

                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (user) {
            setAddress(user.address);
            setPhone(user.contact);
        }
    }, [JSON.stringify(user)]);

    useEffect(() => {
        if (addressRef.current) {
            addressRef.current.addEventListener('blur', () => {
                validator(addressRef, errorAddressRef, ['required']);
            });

            addressRef.current.addEventListener('input', () => {
                addressRef.current.classList.remove('error');
                errorAddressRef.current.style.opacity = 0;
            });
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
    }, [addressRef.current, phoneRef.current]);

    return (
        <div className={className}>
            {isLoading && <Loading isOverlay={true}></Loading>}
            <h2 className={cx('title')}>Th??ng tin giao h??ng</h2>
            <div className={cx('user')}>
                <div className={cx('avatar')}>
                    <UserIcon></UserIcon>
                </div>

                <div className={cx('name')}>
                    {user?.name}({user?.email})
                </div>
            </div>
            <div>
                <input
                    ref={addressRef}
                    className={cx('input')}
                    value={address}
                    placeholder="?????a ch???"
                    onChange={(e) => setAddress(e.target.value)}
                ></input>
                <br></br>
                <span ref={errorAddressRef} className={cx('message-error')}>
                    Kh??ng ???????c ????? tr???ng tr?????ng n??y
                </span>
            </div>

            <div>
                <input
                    ref={phoneRef}
                    className={cx('input')}
                    value={phone}
                    placeholder="S??? ??i???n tho???i"
                    onChange={(e) => setPhone(e.target.value)}
                ></input>{' '}
                <br></br>
                <span ref={errorPhoneRef} className={cx('message-error')}>
                    Kh??ng ???????c ????? tr???ng tr?????ng n??y
                </span>
            </div>

            <div className={cx('method')} onChange={(e) => setMethod(e.target.value)}>
                <h3>Ph????ng th???c thanh to??n</h3>
                <div className={cx('form-input')}>
                    <input type={'radio'} id={'cash'} value={'order'} name={'method'} defaultChecked></input>
                    <label htmlFor="cash">Thanh to??n khi nh???n h??ng</label>
                </div>
                <div className={cx('form-input')}>
                    <input type={'radio'} id={'vnpay'} value={'order-pay'} name={'method'}></input>
                    <label htmlFor="vnpay">Thanh to??n b???ng VN-Pay</label>
                </div>
            </div>
            <button className={cx('btn-pay')} onClick={handleOrderOrPay}>
                {method === 'order' ? '?????t h??ng' : '?????t h??ng v?? Thanh to??n'}
            </button>
        </div>
    );
}

export default Information;
