import classNames from 'classnames/bind';
import styles from '/styles/admin/products.module.scss';

import AdminLayout from '../../../layout/adminLayout';

const cx = classNames.bind(styles);

function Category() {
    return (
        <AdminLayout itemActive={'category'}>
            <div className={cx('wrapper')}>
                <h1>Thể loại</h1>
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
                            <th>Tên thể loại</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Truyện tranh</td>
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

export default Category;
