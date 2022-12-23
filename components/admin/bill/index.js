import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from '/styles/admin/products.module.scss';
import AdminLayout from '../../../layout/adminLayout';
import * as orderServices from '/services/orderServices';

const cx = classNames.bind(styles);

function Bill() {
    const [orders, setOrders] = useState(null);

    const handleChange = async (id, status) => {
        await orderServices.updateStatusOrder(parseInt(id), status);
    };

    const handleSort = async (e) => {
        const orders = await orderServices.getOrders({ page: 1, size: 9 });
        if (orders && orders.data) {
            if (e.target.value === 'no') {
                setOrders(orders.data);
            } else if (e.target.value === 'Wait for pay') {
                const resWait = orders.data.filter((item) => item.status === 'Wait for pay');
                setOrders(resWait);
            } else if (e.target.value === 'Paid') {
                const resPaid = orders.data.filter((item) => item.status === 'Paid');
                setOrders(resPaid);
            } else if (e.target.value === 'Cancel') {
                const resPaid = orders.data.filter((item) => item.status === 'Cancel');
                setOrders(resPaid);
            }
        }
    };

    useEffect(() => {
        const getData = async () => {
            const res = await orderServices.getOrders({ page: 1, size: 9 });
            if (res && res.data) {
                setOrders(res.data);
            }
        };
        getData();
    }, []);
    return (
        <AdminLayout itemActive={'bill'}>
            <div className={cx('wrapper')}>
                <h1>Đơn hàng</h1>
                <div className={cx('header')}>
                    {/* <div className={cx('search')}>
                        <input placeholder="Tìm kiếm..."></input>
                        <button className={cx('btn-search')}>Tìm</button>
                    </div> */}

                    <select onChange={handleSort}>
                        <option value={'no'}>Mặc định</option>
                        <option value={'Wait for pay'}>Wait for pay</option>
                        <option value={'Paid'}>Paid</option>
                        <option value={'Cancel'}>Cancel</option>
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Người đặt</th>
                            <th>Thành tiền</th>
                            <th>Ngày đặt</th>
                            <th>Trạng thái</th>
                            {/* <th>Thao tác</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders &&
                            orders.map((item) => (
                                <tr key={item.idOrder}>
                                    <td>{item.idOrder}</td>
                                    <td>{item.nameUser}</td>
                                    <td>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            item.total,
                                        )}
                                    </td>
                                    <td>{new Date(item.dateOrder).toLocaleString()}</td>
                                    <td>
                                        <select
                                            defaultValue={item.status}
                                            onChange={(e) => handleChange(item.idOrder, e.target.value)}
                                        >
                                            <option name={'status'} value={'Wait for pay'}>
                                                Wait for pay
                                            </option>
                                            <option name={'status'} value={'Paid'}>
                                                Paid
                                            </option>
                                            <option name={'status'} value={'Cancel'}>
                                                Cancel
                                            </option>
                                        </select>
                                    </td>
                                    {/* <td>
                                        <button className={cx('update')}>Sửa</button>
                                        <button className={cx('delete')}>Xóa</button>
                                    </td> */}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

export default Bill;
