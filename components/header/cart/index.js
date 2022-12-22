import classNames from 'classnames/bind';
import { useContext, useEffect, memo, useState } from 'react';
import Link from 'next/link';

import styles from '/styles/header/cart.module.scss';
import { CartIcon } from '../../Icons';
import { AppContext } from '/context/appProvider.js';
import * as cartServices from '/services/cartServices';

const cx = classNames.bind(styles);

function Cart() {
    const { cartItem, setCartItem, user } = useContext(AppContext);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getQuantityCart = async () => {
            if (user && user.idUser) {
                const data = await cartServices.getCartByUserId(user.idUser);
                if (data && data.items && data.items.length > 0) {
                    setCartItem(data.items);
                }
            }
        };
        if (user && user.idUser && cartItem.length === 0) {
            getQuantityCart();
        }
    }, [JSON.stringify(user)]);

    useEffect(() => {
        setTotal(cartItem.reduce((acc, product) => acc + product.quantityCart, 0))
    }, [JSON.stringify(cartItem)])
    return (
        <div className={cx('wrapper')}>
            <Link href={'/cart'}>
                <div className={cx('action-item', 'cart')}>
                    <div className={cx('border')}>
                        <CartIcon className={cx('icon')}></CartIcon>
                    </div>
                    <p>
                        Giỏ hàng (<span>{total}</span>)
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default memo(Cart);
