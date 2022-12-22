import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from '/styles/admin/products.module.scss';
import AdminLayout from '../../../layout/adminLayout';
import * as orderServices from '/services/orderServices';

const cx = classNames.bind(styles);

function Bill() {
    const [orders, setOrders] = useState(null);
    const [ordersSort, setOrdersSort] = useState([])
    
    const handleChange = (id, status) => {
        orderServices.updateStatusOrder(parseInt(id), status)
    }

    const handleSort = (e) => {
        if(e.target.value === 'no'){
            setOrdersSort(orders)
        } else if(e.target.value === 'Wait for pay'){
            const resWait = orders.filter(item => item.status === 'Wait for pay')
            setOrdersSort(resWait)
        } else if (e.target.value === 'Paid'){
            const resPaid = orders.filter(item => item.status === 'Paid')
            setOrdersSort(resPaid)
        }
    }

    useEffect(() => {
        const getData = async () => {
            const res = await orderServices.getOrders({ page: 1, size: 9 });
            console.log(res);
            if (res && res.data) {
                setOrders(res.data);
                setOrdersSort(res.data)
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
                        {ordersSort &&
                            ordersSort.map((item) => (
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
                                        <select defaultValue={item.status} onChange={(e) => handleChange(item.idOrder, e.target.value)}>
                                            <option name={'status'} value={'Wait for pay'}>
                                                Wait for pay
                                            </option>
                                            <option name={'status'} value={'Paid'}>
                                                Paid
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
