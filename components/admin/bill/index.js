import classNames from 'classnames/bind';
import styles from '/styles/admin/products.module.scss';

import AdminLayout from '../../../layout/adminLayout';

const cx = classNames.bind(styles);

function Bill() {
    return (
        <AdminLayout itemActive={'bill'}>
            <div className={cx('wrapper')}>
                <h1>Đơn hàng</h1>
                <div className={cx('header')}>
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm..."></input>
                        <button className={cx('btn-search')}>Tìm</button>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Bá Tước Tiểu Thư Tập 7</td>
                            <td>3</td>
                            <td>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(27000)}
                            </td>
                            <td>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(81000)}
                            </td>
                            <td>Đã thanh toán</td>
                            <td>
                                <button className={cx('update')}>Sửa</button>
                                <button className={cx('delete')}>Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

export default Bill;
