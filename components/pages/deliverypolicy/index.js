import classNames from 'classnames/bind';
import styles from '/styles/pages/delivery.module.scss';

import DefaultLayout from '../../../layout/defaultLayout';

const cx = classNames.bind(styles);

function DeliveryPolicy() {
    return (
        <DefaultLayout>
            <div className="container">
                <p className={cx('header')}>ĐỐI TÁC VẬN CHUYỂN</p>

                <img src="/images/delivery.png" alt="Delivery" />

                <p className={cx('header')}>PHÍ GIAO HÀNG TIÊU CHUẨN</p>
                <p className={cx('title')}>
                    <strong>Khu vực Đà Nẵng</strong>
                </p>
                <table className={cx('table')}>
                    <thead>
                        <th width="50%">Phương thức giao hàng</th>
                        <th width="50%">Phí</th>
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
                        <th width="50%">Phương thức giao hàng</th>
                        <th width="50%">Phí</th>
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

                <p className={cx('title')}>
                    <strong>Thời gian giao hàng theo khu vực</strong>
                </p>

                <table className={cx('table')}>
                    <thead>
                        <th width="50%">Khu vực</th>
                        <th width="50%">Thời gian giao</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Đà Nẵng</td>
                            <td>1 - 3 ngày</td>
                        </tr>

                        <tr>
                            <td>Miền Bắc</td>
                            <td>4 - 7 ngày</td>
                        </tr>

                        <tr>
                            <td>Miền Trung</td>
                            <td>4 - 7 ngày</td>
                        </tr>

                        <tr>
                            <td>Miền Nam</td>
                            <td>4 - 7 ngày</td>
                        </tr>
                    </tbody>
                </table>

                <p className={cx('note')}>
                    <strong>Lưu ý: </strong>Thời gian giao hàng trên chỉ mang tính chất tham khảo, thực tế có thể
                    sớm hoặc muộn hơn tùy theo sản phẩm quý khách đặt mua, và tùy thuộc vào các đơn vị vận chuyển.
                </p>
            </div>
        </DefaultLayout>
    );
}

export default DeliveryPolicy;
