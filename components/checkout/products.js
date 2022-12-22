import classNames from 'classnames/bind';
import { useContext } from 'react';

import { AppContext } from '/context/appProvider.js';
import styles from '/styles/checkouts/products.module.scss';

const cx = classNames.bind(styles);
function Products({ className }) {
    const { cartItem } = useContext(AppContext);

    const total = () => {
        var total;
        if (cartItem && cartItem?.length > 0) {
            total = cartItem.reduce(
                (acc, item) =>
                    acc + (item.product.price - item.product.price * item.product.discount) * item.quantityCart,
                0,
            );
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(total ? total : 0);
    };

    return (
        <div className={className}>
            <div className={cx('wrapper')}>
                <h2>Thông tin sản phẩm</h2>
                <div className={cx('products')}>
                    {cartItem.length > 0 &&
                        cartItem.map((product) => (
                            <div className={cx('product')} key={product.product.idProduct}>
                                <div className={cx('info')}>
                                    <div className={cx('image')}>
                                        <img src={product.product.image}></img>
                                        <span className={cx('quantity')}>{product.quantityCart}</span>
                                    </div>
                                    <span>{product.product.name}</span>
                                </div>
                                <span>
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(
                                        (product.product.price - product.product.price * product.product.discount) *
                                            product.quantityCart,
                                    )}
                                </span>
                            </div>
                        ))}
                </div>
                {cartItem?.length > 0 && (
                    <div className={cx('total')}>
                        <h3>Tổng cộng</h3>
                        <span>{total()}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
