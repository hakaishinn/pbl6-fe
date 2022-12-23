import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';

import styles from '/styles/account/order.module.scss';
import * as orderServices from '/services/orderServices';
import { AppContext } from '/context/appProvider.js';

const cx = classNames.bind(styles);

function Order({ className }) {
    const { user } = useContext(AppContext);

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if (user && user.idUser) {
                const res = await orderServices.getOrdersByIdUser(user.idUser);
                if (res) {
                    setOrders(res);
                }
            }
        };
        getData();
    }, [JSON.stringify(user)]);

    return (
        <div className={className}>
            {orders && orders.data.length > 0 ? (
                <div className={cx('wrapper')}>
                    <h2 className={cx('title')}>Đơn hàng của bạn</h2>
                    <div className={cx('table')}>
                        <table>
                            <thead>
                                <tr>
                                    <th width="25%">Mã đơn hàng</th>
                                    <th width="25%">Ngày đặt</th>
                                    <th width="25%">Trạng thái</th>
                                    <th width="25%">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((item) => (
                                    <tr key={item.idOrder}>
                                        <td>
                                            <Link href={`/account/orders/${item.idOrder}`}>#{item.idOrder}</Link>
                                        </td>
                                        <td>{new Date(item.dateOrder).toLocaleString()}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <span>
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.total)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : <h2 className={cx('title')}>Không có đơn hàng</h2>}
        </div>
    );
}

export default Order;
