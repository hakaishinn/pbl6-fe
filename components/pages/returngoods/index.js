import classNames from 'classnames/bind';
import styles from '/styles/pages/policy.module.scss';

import DefaultLayout from '../../../layout/defaultLayout';

const cx = classNames.bind(styles);

function ReturnGoods() {
    return (
        <DefaultLayout>
            <div className={cx('container')}>
                <p className={cx('header', 'color')}>QUY ĐỊNH ĐỔI - TRẢ SẢN PHẨM</p>
                <p>
                    <strong>Phạm vi đổi trả: </strong>
                    Tất cả quý khách hàng mua sắm tại trực tiếp tại Hiakru hoặc mua Online qua https://www.hikaru.vn/.
                </p>
                <div>
                    <ol>
                        <li className={cx('title')}>Điều kiện áp dụng chính sách đổi sản sản phẩm:</li>
                        <div className={cx('content')}>
                            <ul>
                                <li>Sản phẩm bị lỗi kỹ thuật được xác nhận bởi Nhà sản xuất/Nhà cung cấp.</li>
                                <li>
                                    Thời gian đổi sản phẩm trong vòng mười lăm (15) ngày kể từ ngày ghi trên hóa đơn bán
                                    hàng của Hikaru
                                </li>
                                <li>Sản phẩm còn nguyên seal, đầy đủ bao bì và các quà tặng kèm theo nếu có.</li>
                                <li>Có hình ảnh, video chứng minh sản phẩm lỗi, hư hao do vận chuyển hoặc đóng gói.</li>
                            </ul>
                        </div>
                        <li className={cx('title')}>Trường hợp không được đổi sản phẩm:</li>
                        <div className={cx('content')}>
                            <ul>
                                <li>
                                    Những sản phẩm không thỏa đầy đủ “Điều kiện áp dụng chính sách đổi sản phẩm” đã nêu
                                    ở trên.
                                </li>
                                <li>
                                    Sản phẩm bị hư hại do thiên tai, hỏa hoạn, lụt lội, côn trùng, động vật xâm nhập...
                                </li>
                                <li>Sản phẩm bị biến dạng, nứt vỡ, hư hỏng… do tác động từ bên ngoài.</li>
                            </ul>
                        </div>
                        <li className={cx('title')}>Chính sách đổi sản phẩm:</li>
                        <div className={cx('content')}>
                            <ul>
                                <li>
                                    Thực hiện chính sách một đổi một: đổi sản phẩm cùng mẫu, cùng màu, cùng dung lượng,…
                                </li>
                                <li>Không áp dụng đối với trường hợp trả hàng và hoàn tiền sản phẩm.</li>
                                <li>
                                    Trong trường hợp trả hàng hoàn tiền, Hikaru sẽ hoàn trả lại bằng chuyển khoản hoặc
                                    tiền mặt, tùy theo yêu cầu của khách hàng, sau khi trừ đi các chi phí vận chuyển và
                                    chi phí khác nếu có.
                                </li>
                            </ul>
                        </div>
                    </ol>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default ReturnGoods;
