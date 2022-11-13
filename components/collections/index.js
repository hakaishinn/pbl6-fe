import classNames from 'classnames/bind';


import styles from '/styles/collections/collections.module.scss';
import DefaultLayout from '/layout/defaultLayout';
import Sidebar from './sidebar';
import ListProduct from './listProduct';

const cx = classNames.bind(styles);

function Collections({ products, title, categories }) {

    return (
        <DefaultLayout>
            <div className="container">
                <div className={cx('content')}>
                    <div className={cx('sidebar')}>
                        <Sidebar categories={categories}></Sidebar>
                    </div>
                    <div className={cx('group-product')}>
                        <h1 className={cx('title')}>{title}</h1>
                        <div className={cx('sort')}>
                            <span>Sắp xếp theo:</span>
                            <select>
                                <option value={0}>Sản phẩm nổi bật</option>
                                <option value={1}>Từ A - Z</option>
                                <option value={2}>Từ Z - A</option>
                            </select>
                        </div>
                        <div>
                            <ListProduct data = {products}></ListProduct>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Collections;
