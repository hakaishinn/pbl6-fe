import classNames from 'classnames/bind';
import styles from '/styles/admin/products.module.scss';

import AdminLayout from '../../../layout/adminLayout';

const cx = classNames.bind(styles);

function Statistical() {
    return (<AdminLayout itemActive={'statistical'}>
        <div className={cx('wrapper')}>
            <h1>Thống kê</h1>
        </div>
    </AdminLayout>)
}

export default Statistical;
