import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from '/styles/admin/products.module.scss';
import AdminLayout from '../../../layout/adminLayout';
import * as orderServices from '/services/orderServices';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

function Bill() {
    const [orders, setOrders] = useState(null);
    const [status, setStatus] = useState('all');
    const router = useRouter();

    const page = router.query.page;

    const pageCount = orders?.totalPage || 0;

    const handlePageClick = async (event) => {
        router.push({
            pathname: `/admin/bill`,
            query: { page: event.selected + 1 },
        });
    };

    const handleChange = async (id, status) => {
        await orderServices.updateStatusOrder(parseInt(id), status);
    };

    const handleSort = async (e) => {
        setStatus(e.target.value);
        router.push({
            pathname: `/admin/bill`,
        });
    };

    useEffect(() => {
        const getData = async () => {
            if (status === 'all') {
                if (page) {
                    const res = await orderServices.getOrders({ page: page, size: 9 });
                    if (res && res.data) {
                        setOrders(res);
                    }
                } else {
                    const res = await orderServices.getOrders({ page: 1, size: 9 });
                    if (res && res.data) {
                        setOrders(res);
                    }
                }
            } else {
                if (page) {
                    const res = await orderServices.getOrders({ status: status, page: page, size: 9 });
                    if (res && res.data) {
                        setOrders(res);
                    }
                } else {
                    const res = await orderServices.getOrders({ status: status, page: 1, size: 9 });
                    if (res && res.data) {
                        setOrders(res);
                    }
                }
            }
        };
        getData();
    }, [status, page]);
    return (
        <AdminLayout itemActive={'bill'}>
            <div className={cx('wrapper')}>
                <h1>Đơn hàng</h1>
                <div className={cx('header')}>
                    <select onChange={handleSort}>
                        <option value={'all'}>Mặc định</option>
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
                        </tr>
                    </thead>
                    <tbody>
                        {orders &&
                            orders.data &&
                            orders.data.map((item) => (
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
                                </tr>
                            ))}
                    </tbody>
                </table>
                {orders?.data ? (
                    <ReactPaginate
                        forcePage={page ? page - 1 : 0}
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        containerClassName={cx('pagination')}
                        pageLinkClassName={cx('page-num')}
                        previousLinkClassName={cx('page-num')}
                        nextLinkClassName={cx('page-num')}
                        activeLinkClassName={cx('active')}
                    />
                ) : undefined}
            </div>
        </AdminLayout>
    );
}

export default Bill;
