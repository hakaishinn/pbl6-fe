import classNames from 'classnames/bind';
import { useContext, useEffect } from 'react';
import Link from 'next/link';

import styles from '/styles/header/cart.module.scss';
import { CartIcon } from '../../Icons';
import { AppContext } from '/context/appProvider.js';
import * as cartServices from '/services/cartServices';

const cx = classNames.bind(styles);

function Cart() {
    const { quantityCart, setQuantityCart, user } = useContext(AppContext);

    useEffect(() => {
        const getQuantityCart = async () => {
            if (user && user.idUser) {
                const data = await cartServices.getCartByUserId(user.idUser);
                if (data && data.items && data.items.length > 0) {
                    const totalItem = data.items.reduce((acc, product) => acc + product.quantityCart, 0);
                    setQuantityCart(totalItem);
                }
            }
        };
        if (user && user.idUser) {
            getQuantityCart();
        }
    }, [user]);
    return (
        <div className={cx('wrapper')}>
            <Link href={'/cart'}>
                <div className={cx('action-item', 'cart')}>
                    <div className={cx('border')}>
                        <CartIcon className={cx('icon')}></CartIcon>
                    </div>
                    <p>
                        Giỏ hàng (<span>{quantityCart}</span>)
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default Cart;
