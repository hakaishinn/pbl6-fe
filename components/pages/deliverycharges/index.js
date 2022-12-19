import DefaultLayout from '../../../layout/defaultLayout';
import classNames from 'classnames/bind';
import styles from '/styles/pages/delivery.module.scss';

const cx = classNames.bind(styles);

function DeliveryCharges() {
    return (
        <DefaultLayout>
            <div className="container">
                <p className={cx('header')}>PHÍ GIAO HÀNG TIÊU CHUẨN</p>
                <p className={cx('title')}>
                    <strong>Khu vực Đà Nẵng</strong>
                </p>
                <div className={cx('content')}>
                    <table className={cx('table')}>
                        <thead>
                            <th width='50%'>Phương thức giao hàng</th>
                            <th width='50%'>Phí</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Giao hàng tiêu chuẩn (Đơn từ 0đ - 349.000đ)</td>
                                <td>19.000đ - 32.000đ</td>
                            </tr>
    
                            <tr>
                                <td>Giao hàng miễn phí (Đơn từ 350.000đ trở lên)</td>
                                <td>0đ</td>
                            </tr>
    
                            <tr>
                                <td>Giao hàng nhanh trong 2h</td>
                                <td>29.000đ - 49.000đ</td>
                            </tr>
                        </tbody>
                    </table>
    
                    <p className={cx('title')}>
                        <strong>Các khu vực khác</strong>
                    </p>
                    <table className={cx('table')}>
                        <thead>
                            <th width='50%'>Phương thức giao hàng</th>
                            <th width='50%'>Phí</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Giao hàng tiêu chuẩn (Đơn từ 0đ - 499.000đ)</td>
                                <td>30.000đ - 45.000đ</td>
                            </tr>
    
                            <tr>
                                <td>Giao hàng miễn phí (Đơn từ 500.000đ trở lên)</td>
                                <td>0đ</td>
                            </tr>
    
                            <tr>
                                <td>Giao hàng nhanh trong 2h (Không hổ trợ)</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default DeliveryCharges;
