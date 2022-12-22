import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import * as orderServices from '/services/orderServices';
import styles from '/styles/account/orderDetail.module.scss';

const cx = classNames.bind(styles);

function OrderDetail() {
    const router = useRouter();

    const id = router.query.id;

    console.log(id);

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const res = await orderServices.getOrderById(id);
            if (res) {
                setOrder(res);
            }
        };
        getData();
    }, [id]);
    return (
        <div className="container">
            <h2 className={cx('title')}>Thông tin đơn hàng</h2>
            {order && (
                <div className={cx('wrapper')}>
                    <p>Ngày đặt: {new Date(order.dateOrder).toLocaleString()}</p>
                    <p>Địa chỉ: {order.address}</p>
                    <p>Trạng thái: {order.status}</p>

                    <div className={cx('table')}>
                        <table>
                            <thead>
                                <tr>
                                    <th width="33%">Mã sản phẩm</th>
                                    <th width="33%">Số lượng</th>
                                    <th width="33%">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order &&
                                    order.orders.length > 0 &&
                                    order.orders.map((item) => (
                                        <tr key={item.idOrder}>
                                            <td>
                                                <Link href={`/products/${item.idProduct}`}>#{item.idProduct}</Link>
                                            </td>

                                            <td>{item.quantity}</td>
                                            <td>
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.price)}
                                            </td>
                                        </tr>
                                    ))}

                                <tr>
                                    <td className={cx('total')} colspan="2">
                                        Tổng cộng
                                    </td>
                                    <td>
                                        <span className={cx('total-price')}>
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            }).format(
                                                order.total
                                            )}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderDetail;
