import classNames from "classnames/bind";
import styles from "/styles/header/cart.module.scss"

import { CartIcon } from "../../Icons";
import Link from "next/link";

const cx = classNames.bind(styles)

function Cart() {
    return (
        <div className={cx('wrapper')}>
            <Link href={'/cart'}>
                <div className={cx('action-item', 'cart')}>
                    <div className={cx('border')}>
                        <CartIcon className={cx('icon')}></CartIcon>
                    </div>
                    <p>
                        Giỏ hàng (<span>0</span>)
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default Cart;
