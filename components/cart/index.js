import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import styles from '/styles/cart/cart.module.scss';
import Quantity from '/components/quantity';
import { AppContext } from '/context/appProvider.js';
import * as cartServices from '/services/cartServices';
import { LoadingSkeleton } from '../loading';

const cx = classNames.bind(styles);
function Cart() {
    const { user, quantityCart, setQuantityCart } = useContext(AppContext);

    const [data, setData] = useState(null);

    const getCarts = async () => {
        if (user.idUser) {
            const result = await cartServices.getCartByUserId(user.idUser);
            if (result && result.items) {
                setData(result.items);
            }
        }
    };

    const changeQuantity = (childData) => {
        if (data && data.length > 0) {
            setData(
                data.map((item) => {
                    if (item.id === childData.idItemCart) {
                        return {
                            ...item,
                            quantityCart: childData.quantity,
                        };
                    } else {
                        return item;
                    }
                }),
            );
        }
    };

    const total = () => {
        var total;
        if (data && data.length > 0) {
            total = data.reduce(
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

    useEffect(() => {
        const GetData = async () => {
            if (user) {
                await getCarts();
            } else {
                setData([]);
            }
        };
        GetData();
    }, [user]);

    return (
        <div className="container">
            {user ? (
                quantityCart !== 0 ? (
                    <div className={cx('wrapper')}>
                        <h1 className={cx('cart-title')}>Giỏ hàng của bạn</h1>
                        <div className={cx('cart-table')}>
                            <div className={cx('cart-number')}>
                                Bạn đang có <span>{quantityCart} sản phẩm</span> trong giỏ hàng.
                            </div>
                            {data?.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="50%" colSpan={2}>
                                                Sản phẩm
                                            </th>
                                            <th width="15%">Đơn giá</th>
                                            <th width="15%">Số lượng</th>
                                            <th width="15%">Thành tiền</th>
                                            <th width="5%"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            data.length > 0 &&
                                            data.map((product) => (
                                                <tr key={product.product.idProduct}>
                                                    <td className={cx('image')}>
                                                        <Link href={`/products/${product.product.idProduct}`}>
                                                            <img
                                                                src={product.product.image}
                                                                alt={product.product.name}
                                                            ></img>
                                                        </Link>
                                                    </td>
                                                    <td className={cx('info')}>
                                                        <Link href={`/products/${product.product.idProduct}`}>
                                                            <h3>{product.product.name}</h3>
                                                        </Link>
                                                    </td>
                                                    <td className={cx('price')}>
                                                        <span>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(
                                                                product.product.price -
                                                                    product.product.price * product.product.discount,
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td className={cx('quantity')}>
                                                        <Quantity
                                                            isCart={true}
                                                            product={product}
                                                            value={product.quantityCart}
                                                            parentCallback={changeQuantity}
                                                        ></Quantity>
                                                    </td>
                                                    <td className={cx('price')}>
                                                        <span>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(
                                                                (product.product.price -
                                                                    product.product.price * product.product.discount) *
                                                                    product.quantityCart,
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className={cx('delete')}
                                                            onClick={async () => {
                                                                cartServices.removeCartItemByItem(parseInt(product.id));
                                                                setData(data.filter((item) => item.id !== product.id));
                                                                setQuantityCart((prev) => prev - product.quantityCart);
                                                            }}
                                                        >
                                                            Xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="50%" colSpan={2}>
                                                Sản phẩm
                                            </th>
                                            <th width="15%">Đơn giá</th>
                                            <th width="15%">Số lượng</th>
                                            <th width="15%">Thành tiền</th>
                                            <th width="5%"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={cx('image')}>
                                                <LoadingSkeleton className={'image-cart'}></LoadingSkeleton>
                                            </td>
                                            <td className={cx('info')}>
                                                <LoadingSkeleton className={'name-cart'}></LoadingSkeleton>
                                            </td>
                                            <td className={cx('price')}>
                                                <span>
                                                    <LoadingSkeleton className={'other'}></LoadingSkeleton>
                                                </span>
                                            </td>
                                            <td className={cx('quantity')}>
                                                <LoadingSkeleton className={'other'}></LoadingSkeleton>
                                            </td>
                                            <td className={cx('price')}>
                                                <span>
                                                    <LoadingSkeleton className={'other'}></LoadingSkeleton>
                                                </span>
                                            </td>
                                            <td>
                                                <button className={cx('delete')}>
                                                    <LoadingSkeleton className={'other'}></LoadingSkeleton>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className={cx('cart-bottom')}>
                            <h3 className={cx('total-money')}>
                                Thành tiền: <span>{total()}</span>
                            </h3>
                            <button className={cx('btn')}>Thanh toán</button>
                        </div>
                    </div>
                ) : (
                    <h1 className={cx('cart-notification')}>Giỏ hàng của bạn trống</h1>
                )
            ) : (
                <h1 className={cx('cart-notification')}>Bạn cần đăng nhập để xem giỏ hàng</h1>
            )}
        </div>
    );
}

export default Cart;
