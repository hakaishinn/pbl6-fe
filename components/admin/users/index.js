import classNames from 'classnames/bind';
import styles from '/styles/admin/products.module.scss';

import AdminLayout from '../../../layout/adminLayout';

const cx = classNames.bind(styles);

function Users() {
    return (
        <AdminLayout itemActive={'users'}>
            <div className={cx('wrapper')}>
                <h1>Người dùng</h1>
                <div className={cx('header')}>
                    <div className={cx('search')}>
                        <input placeholder="Tìm kiếm..."></input>
                        <button className={cx('btn-search')}>Tìm</button>
                    </div>

                    <button className={cx('add')}>Thêm</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Loại</th>
                            <th>Tên đăng nhập</th>
                            <th>Tên hiển thị</th>
                            <th>Địa chỉ</th>
                            <th>Liên hệ</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Người dùng</td>
                            <td>user01</td>
                            <td>
                                User 01
                            </td>
                            <td>
                                Số 25, đường Nguyễn Lương Bằng, phường Hòa Khánh Bắc, quận Liên Chiểu, Đà Nẵng
                            </td>
                            <td>
                                0385078386
                            </td>
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

export default Users;
