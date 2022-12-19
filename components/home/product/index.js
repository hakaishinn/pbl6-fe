import { useContext } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';

import styles from '/styles/home/product.module.scss';
import { AppContext } from '/context/appProvider.js';
import * as cartServices from '/services/cartServices';


const cx = classNames.bind(styles);

function Product({ product }) {
    const newPrice = product.price - product.price * product.discount;
    const { user, setQuantityCart, setIsShowLogin } = useContext(AppContext);

    const handleAddToCart = async () => {
        if(user){
            await cartServices.addCartItem(product.idProduct, user.idUser, 1)
            setQuantityCart(prev => prev + 1)
            alert("Thêm thành công")
        } else {
            setIsShowLogin(true)
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className="title">
                <Link href={`/products/${product.idProduct}`} className={cx('name')}>
                    {product.name}
                </Link>
                <div className={cx('price')}>
                    <p className={cx('new-price')}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newPrice)}
                    </p>
                    <p className={cx('old-price')}>
                        {product.price !== newPrice
                            ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                  product.price,
                              )
                            : ''}
                    </p>
                </div>
            </div>
            <Link className={cx('image')} href={`/products/${product.idProduct}`}>
                <img src={product.image} alt={product.name}></img>
            </Link>
            <button onClick={handleAddToCart}>THÊM VÀO GIỎ</button>
        </div>
    );
}

export default Product;
