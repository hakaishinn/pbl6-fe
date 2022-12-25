import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as orderSevices from '/services/orderServices';
import classNames from 'classnames/bind';
import styles from '/styles/vnpay/vnpay.module.scss'
const cx= classNames.bind(styles)
function ReturnVnPay() {
    const router = useRouter();
    const {
        vnp_ResponseCode,
        vnp_TxnRef,
        vnp_Amount,
        vnp_OrderInfo,
        vnp_TransactionNo,
        vnp_BankCode,
        vnp_PayDate,
        vnp_SecureHash,
    } = router.query;
    const [vncode, setVnCode] = useState(vnp_ResponseCode);
    console.log(vnp_ResponseCode);

    useEffect(() => {
        setVnCode(vnp_ResponseCode);
    }, [vnp_ResponseCode]);

    useEffect(() => {
        if (vnp_ResponseCode == '00') {
            orderSevices.updateStatusOrderVnPay(vnp_TxnRef, vnp_ResponseCode);
        }
    }, [vnp_ResponseCode]);
    return (
        <div className="container">
            <div className={cx('wrapper')}>
                <div>
                    <h3 className={cx('title')}>VNPAY RESPONSE</h3>
                </div>
                <div>
                    <div className={cx('form-group')}>
                        <label>Mã đơn hàng:</label>
    
                        <span>{vnp_TxnRef}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <label>Số tiền:</label>
                        <span>
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(vnp_Amount / 100)}
                        </span>
                    </div>
                    <div className={cx('form-group')}>
                        <label>Nội dung thanh toán:</label>
                        <span>{vnp_OrderInfo}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <label>Mã phản hồi (vnp_ResponseCode):</label>
                        <span>{vnp_ResponseCode}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <label>Mã GD Tại VNPAY:</label>
                        <span>{vnp_TransactionNo}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <label>Mã Ngân hàng:</label>
                        <span>{vnp_BankCode}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <label>Thời gian thanh toán:</label>
                        <span>{vnp_PayDate}</span>
                    </div>
                    <div className={cx('form-group')}>
                        <label>Kết quả:</label>
                        <span>{vnp_ResponseCode === '00' ? 'GD Thanh cong' : 'GD khong thanh cong'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReturnVnPay;
