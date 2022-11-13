import classNames from 'classnames/bind';

import styles from '/styles/cart/cart.module.scss';
import Quantity from '/components/quantity';
import Link from 'next/link';

const cx = classNames.bind(styles);
function Cart() {
    return (
        <div className="container">
            <div className={cx('wrapper')}>
                <h1 className={cx('cart-title')}>Giỏ hàng của bạn</h1>
                <div className={cx('cart-table')}>
                    <div className={cx('cart-number')}>
                        Bạn đang có <span>2 sản phẩm</span> trong giỏ hàng.
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={2}>Sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cx('image')}>
                                    <Link href="/products/1">
                                        <img src="https://product.hstatic.net/1000376556/product/bia_bongtrangtrangnga-1_39e287933d0b4b218b44473691dd1a2b_large.png"></img>
                                    </Link>
                                </td>
                                <td className={cx('info')}>
                                    <Link href="/products/1">
                                        <h3>Bóng Trăng Trắng Ngà</h3>
                                    </Link>
                                </td>
                                <td className={cx('price')}>
                                    <span>30,000đ</span>
                                </td>
                                <td className={cx('quantity')}>
                                    <Quantity></Quantity>
                                </td>
                                <td className={cx('price')}>
                                    <span>30,000đ</span>
                                </td>
                                <td>
                                    <button className={cx('delete')}>Xóa</button>
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('image')}>
                                    <Link href="/products/1">
                                        <img src="https://product.hstatic.net/1000376556/product/vua_sang_che_-_tap_21_211c1e01a1874a829f1e068b939b8770_1024x1024.jpg"></img>
                                    </Link>
                                </td>
                                <td className={cx('info')}>
                                    <Link href="/products/1">
                                        <h3>Vua Sáng Chế</h3>
                                    </Link>
                                </td>
                                <td className={cx('price')}>
                                    <span>20,000đ</span>
                                </td>
                                <td className={cx('quantity')}>
                                    <Quantity></Quantity>
                                </td>
                                <td className={cx('price')}>
                                    <span>20,000đ</span>
                                </td>
                                <td>
                                    <button className={cx('delete')}>Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={cx('cart-bottom')}>
                    <h3 className={cx('total-money')}>
                        Thành tiền: <span>50,000đ</span>
                    </h3>
                    <button className={cx('btn')}>Cập nhật giỏ hàng</button>
                    <button className={cx('btn')}>Thanh toán</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
