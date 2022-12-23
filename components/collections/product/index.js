import classNames from 'classnames/bind';
import Link from 'next/link';
import { useContext } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from '/styles/collections/product.module.scss';
import { AppContext } from '/context/appProvider.js';
import * as cartServices from '/services/cartServices';

const cx = classNames.bind(styles);
function Product({ product }) {
    const { user, setCartItem, setIsShowLogin } = useContext(AppContext);

    const newPrice = product ? product.price - product.price * product.discount : 0;

    const handleAddToCart = async () => {
        if (user) {
            const data = await cartServices.addCartItem(product.idProduct, user.idUser, 1);
            if (data && data.status === 'Success') {
                setCartItem((prev) => [...prev, data.data]);
                alert('Thêm thành công');
            } else {
                alert('Thêm thất bại');
            }
        } else {
            setIsShowLogin(true);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image')}>
                <Link href={`/products/${product.idProduct}`}>
                    <img src={product.image} alt={product.name} title={product.name}></img>
                </Link>
            </div>
            <div className={cx('text')}>
                <div className={cx('name')}>
                    <HeadlessTippy
                        offset={[0, 4]}
                        placement="top"
                        render={(attrs) => (
                            <div className={cx('sub-name')} tabIndex="-1" {...attrs}>
                                <span>{product.name}</span>
                            </div>
                        )}
                    >
                        <Link href={`/products/${product.idProduct}`}>{product.name}</Link>
                    </HeadlessTippy>
                </div>
                <div className={cx('price')}>
                    <span>{`${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        newPrice,
                    )}`}</span>
                    <span>
                        {product.price !== newPrice
                            ? `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                  product.price,
                              )}`
                            : ''}
                    </span>
                </div>
                <div className={cx('add-to-cart')}>
                    <button onClick={handleAddToCart}>Thêm vào giỏ</button>
                </div>
            </div>
        </div>
    );
}

export default Product;
