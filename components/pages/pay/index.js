import classNames from 'classnames/bind';
import styles from '/styles/pages/policy.module.scss';

import DefaultLayout from '../../../layout/defaultLayout';

const cx = classNames.bind(styles);

function Pay() {
    return (
        <DefaultLayout>
            <div className={cx('container')}>
                <div>
                    <ol>
                        <li className={cx('title')}>Thanh toán bằng tiền mặt khi nhận hàng (COD):</li>
                        <div className={cx('content')}>
                            <ul>
                                <li>
                                    Các yêu cầu giao hàng cần có thông tin chính xác về người nhận, địa chỉ, số điện
                                    thoại.
                                </li>
                                <li>
                                    Quý khách vui lòng kiểm tra đúng tên và thông tin nhận hàng kèm theo gói hàng, trước
                                    khi thanh toán. Hikaru không chiệu trách nhiệm phần quý khách thanh toán dư cho
                                    người giao hàng nếu có.
                                </li>
                            </ul>
                        </div>
                        <li className={cx('title')}>Chuyển tiền qua VNPAY</li>
                        <div className={cx('content')}>
                            <ul>
                                <li>
                                    Đối với các đơn hàng chọn phương thức thanh toán bằng: Thanh toán qua VNPAY: Sau khi
                                    đặt hàng thành công, quý khách hàng vui lòng chuyển khoản 100% giá trị đơn hàng.
                                </li>
                                <li>
                                    Nội dung thanh toán, vui lòng ghi vào nội dung: Thanh toán đơn hàng: Mã đơn hàng của
                                    bạn
                                </li>
                                <li>
                                    Hikaru chỉ tiến hành giao hàng khi đơn hàng đã được xác nhận thanh toán thành công.
                                </li>
                                <li>
                                    Nếu cần hỗ trợ thêm, vui lòng gọi điện đến hotline 0385078386 để được hỗ trợ kịp
                                    thời.
                                </li>
                            </ul>
                        </div>
                        <li className={cx('title')}>Thanh toán trực tiếp tại cửa hàng:</li>
                        <div className={cx('content')}>
                            <ul>
                                <li>Địa chỉ 1: 54 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</li>
                                <li>Địa chỉ 2: 60 Điện Biên Phủ, Thanh Khê, quận Thanh Khê, Đà Nẵng </li>
                            </ul>
                        </div>
                    </ol>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Pay;
