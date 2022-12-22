import classNames from 'classnames/bind';
import { faReceipt, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import styles from '/styles/admin/dashboard.module.scss';
import Card from '../card';
import * as orderServices from '/services/orderServices'


const cx = classNames.bind(styles);
function Dashboard() {

    return (
        <div className={cx('wrapper')}>
            <h1>Tổng quan</h1>
            <div className={cx('card')}>
                <Card
                    icon={faSackDollar}
                    title={'Tiền của hôm nay'}
                    value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1000000)}
                    growth={5}
                    footer="hôm qua"
                ></Card>
                <Card
                    color={'green'}
                    icon={faReceipt}
                    title={'Đơn hàng'}
                    value={55}
                    growth={-3}
                    footer="hôm qua"
                ></Card>
                <Card
                    icon={faUser}
                    color={'pink'}
                    title={'Người dùng mới'}
                    value={100}
                    growth={8}
                    footer="hôm qua"
                ></Card>
                <Card
                    icon={faSackDollar}
                    color={'blue'}
                    title={'Doanh thu'}
                    value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(15200000)}
                    growth={15}
                    footer="tháng trước"
                ></Card>
            </div>
        </div>
    );
}

export default Dashboard;
