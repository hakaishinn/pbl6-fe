import classNames from 'classnames/bind';
import styles from '/styles/admin/products.module.scss';

import AdminLayout from '../../../layout/adminLayout';

const cx = classNames.bind(styles);

function Products() {
    return (
        <AdminLayout itemActive={'products'}>
            <div className={cx('wrapper')}>
                <h1>Sản phẩm</h1>
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
                            <th>Thể loại</th>
                            <th>Tên sản phẩm</th>
                            <th>Ảnh sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Truyện tranh</td>
                            <td>[Bản đặc biệt] Hôm Nay Cậu Ấy Cũng Thật Dễ Thương Tập 1</td>
                            <td>
                                <div className={cx('image')}>
                                    <img
                                        src="https://product.hstatic.net/1000376556/product/anh_2__2__c329417e7b0d44539790e9e0e836deeb_1024x1024.png"
                                        alt="img"
                                    ></img>
                                </div>
                            </td>
                            <td>
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(197100)}
                            </td>
                            <td>130</td>
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

export default Products;
