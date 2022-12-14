import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

import styles from '/styles/cart/cart.module.scss';
import Quantity from '/components/quantity';
import { AppContext } from '/context/appProvider.js';
import * as cartServices from '/services/cartServices';
import DefaultLayout from '/layout/defaultLayout';

const cx = classNames.bind(styles);
function Cart() {
    const router = useRouter()
    const { user, cartItem, setCartItem } = useContext(AppContext);

    const [data, setData] = useState(cartItem);

    const handleDelete = async (id) => {
        cartServices.removeCartItemByItem(parseInt(id));
        setCartItem(data.filter((item) => item.id !== id));
        setData(data.filter((item) => item.id !== id));
    };

    const changeQuantity = (childData) => {
        if (data && data.length > 0) {
            const dataAfterChange = data.map((item) => {
                if (item.id === childData.idItemCart && item.quantityCart !== childData.quantity) {
                    if (childData.quantity === 0) {
                        cartServices.updateCartItem(childData.idItemCart, 1);
                        return {
                            ...item,
                            quantityCart: 1,
                        };
                    } else {
                        cartServices.updateCartItem(childData.idItemCart, childData.quantity);
                        return {
                            ...item,
                            quantityCart: childData.quantity,
                        };
                    }
                } else {
                    return item;
                }
            });
            setData(dataAfterChange);
            setCartItem(dataAfterChange);
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

    const handleCheckout = () => {

        router.push('/checkouts')
    }

    useEffect(() => {
        const GetData = () => {
            if (user) {
                setData(cartItem);
            } else {
                setData([]);
            }
        };
        GetData();
    }, [JSON.stringify(user), JSON.stringify(cartItem)]);

    return (
        <DefaultLayout>
            <div className="container">
                {user ? (
                    data?.length > 0 ? (
                        <div className={cx('wrapper')}>
                            <h1 className={cx('cart-title')}>Gi??? h??ng c???a b???n</h1>
                            <div className={cx('cart-table')}>
                                <div className={cx('cart-number')}>
                                    B???n ??ang c??{' '}
                                    <span>{data.reduce((acc, product) => acc + product.quantityCart, 0)} s???n ph???m</span>{' '}
                                    trong gi??? h??ng.
                                </div>

                                <table>
                                    <thead>
                                        <tr>
                                            <th width="50%" colSpan={2}>
                                                S???n ph???m
                                            </th>
                                            <th width="15%">????n gi??</th>
                                            <th width="15%">S??? l?????ng</th>
                                            <th width="15%">Th??nh ti???n</th>
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
                                                            onClick={() => handleDelete(product.id)}
                                                        >
                                                            X??a
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('cart-bottom')}>
                                <h3 className={cx('total-money')}>
                                    Th??nh ti???n: <span>{total()}</span>
                                </h3>
                                <button onClick={handleCheckout} className={cx('btn')}>
                                    ?????t h??ng
                                </button>
                            </div>
                        </div>
                    ) : (
                        <h1 className={cx('cart-notification')}>Gi??? h??ng c???a b???n tr???ng</h1>
                    )
                ) : (
                    <h1 className={cx('cart-notification')}>B???n c???n ????ng nh???p ????? xem gi??? h??ng</h1>
                )}
            </div>
        </DefaultLayout>
    );
}

export default Cart;
