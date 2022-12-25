import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '/styles/vnpay/create.module.scss';
import axios from 'axios';
import { sha512 } from 'js-sha512';
import * as vnpayServices from '/services/vnpayServices';

const cx = classNames.bind(styles);

function Create() {
    const router = useRouter();

    const { price, id } = router.query;
    const [orderDesc, setOrderDesc] = useState('Noi dung thanh toan');
    const [bankCode, setBankCode] = useState('NCB');
    const [url, setUrl] = useState('');
    // const [ip, setIP] = useState('');

    const getDate = () => {
        const d = new Date();
        if (d.getHours() / 10 === 0) {
            return `${d.getFullYear()}${
                d.getMonth() + 1
            }${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;
        } else {
            return `${d.getFullYear()}${d.getMonth()}${d.getDate()}0${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;
        }
    };
    // const data = {
    //     vnp_Amount: price * 100,
    //     vnp_BankCode: bankCode,
    //     vnp_Command: process.env.NEXT_PUBLIC_URL_COMMAND,
    //     vnp_CreateDate: getDate(),
    //     vnp_CurrCode: 'VND',
    //     vnp_ExpireDate: '20221226063012',
    //     vnp_IpAddr: ip,
    //     vnp_Locale: 'vn',
    //     vnp_OrderInfo: orderDesc,
    //     vnp_OrderType: 'other',
    //     vnp_ReturnUrl: process.env.NEXT_PUBLIC_URL_RETURN_URL,
    //     vnp_TmnCode: process.env.NEXT_PUBLIC_VNP_TMNCODE,
    //     vnp_TxnRef: getDate(),
    //     vnp_Version: process.env.NEXT_PUBLIC_VNP_VERSION,
    // };

    const handlePay = () => {
        // var result = '';
        // var i = 0;
        // for (var key in data) {
        //     if (i === 1) {
        //         result += `&${encodeURI(key)}=${encodeURIComponent(data[key])}`;
        //     } else {
        //         result += `${encodeURI(key)}=${encodeURIComponent(data[key])}`;
        //         i = 1;
        //     }
        // }
        // const vnpSecureHash = sha512.hmac(process.env.NEXT_PUBLIC_VNP_HASHSECRET, result);

        router.push(url);
    };

    //creating function to load ip address from the API
    // const getData = async () => {
    //     const res = await axios.get('https://geolocation-db.com/json/');
    //     setIP(res.data.IPv4);
    // };

    // useEffect(() => {
    //     //passing getData method to the lifecycle method
    //     getData();
    // }, []);

    useEffect(() => {
        const getData = async () => {
            if (id) {
                const res = await vnpayServices.getLinkVnPay(id, 'orther', 0, orderDesc, bankCode, 'vn');
                console.log(res);
                if(res){
                    setUrl(res)
                }
            }
        };
        getData()
    }, [id]);

    return (
        <div className="container">
            <h3 className={cx('title')}>Tạo mới đơn hàng</h3>
            <div className={cx('form-group')}>
                <label htmlFor="language">Loại hàng hóa </label>
                <select name="order_type" id="order_type" className={cx('form-control')} onChange={() => {}}>
                    <option value="billpayment">Thanh toán hóa đơn</option>
                </select>
            </div>
            <div className={cx('form-group')}>
                <label htmlFor="order_id">Mã hóa đơn</label>
                <input
                    className={cx('form-control')}
                    id="order_id"
                    name="order_id"
                    type="text"
                    value={getDate()}
                    disabled
                />
            </div>
            <div className={cx('form-group')}>
                <label htmlFor="amount">Số tiền</label>
                <input
                    className={cx('form-control')}
                    id="amount"
                    name="amount"
                    type="number"
                    value={price || ''}
                    disabled
                />
            </div>
            <div className={cx('form-group')}>
                <label htmlFor="order_desc">Nội dung thanh toán</label>
                <textarea
                    className={cx('form-control')}
                    id="order_desc"
                    name="order_desc"
                    value={orderDesc}
                    onChange={(e) => setOrderDesc(e.target.value)}
                ></textarea>
            </div>
            <div className={cx('form-group')}>
                <label htmlFor="bank_code">Ngân hàng</label>
                <select
                    name="bank_code"
                    id="bank_code"
                    className={cx('form-control')}
                    value={bankCode}
                    onChange={(e) => {
                        setBankCode(e.target.value);
                    }}
                >
                    <option value="">Không chọn</option>
                    <option value="NCB"> Ngan hang NCB</option>
                    <option value="AGRIBANK"> Ngan hang Agribank</option>
                    <option value="SCB"> Ngan hang SCB</option>
                    <option value="SACOMBANK">Ngan hang SacomBank</option>
                    <option value="EXIMBANK"> Ngan hang EximBank</option>
                    <option value="MSBANK"> Ngan hang MSBANK</option>
                    <option value="NAMABANK"> Ngan hang NamABank</option>
                    <option value="VNMART"> Vi dien tu VnMart</option>
                    <option value="VIETINBANK">Ngan hang Vietinbank</option>
                    <option value="VIETCOMBANK"> Ngan hang VCB</option>
                    <option value="HDBANK">Ngan hang HDBank</option>
                    <option value="DONGABANK"> Ngan hang Dong A</option>
                    <option value="TPBANK"> Ngân hàng TPBank</option>
                    <option value="OJB"> Ngân hàng OceanBank</option>
                    <option value="BIDV"> Ngân hàng BIDV</option>
                    <option value="TECHCOMBANK"> Ngân hàng Techcombank</option>
                    <option value="VPBANK"> Ngan hang VPBank</option>
                    <option value="MBBANK"> Ngan hang MBBank</option>
                    <option value="ACB"> Ngan hang ACB</option>
                    <option value="OCB"> Ngan hang OCB</option>
                    <option value="IVB"> Ngan hang IVB</option>
                    <option value="VISA"> Thanh toan qua VISA/MASTER</option>
                </select>
            </div>
            <div className={cx('form-group')}>
                <label htmlFor="language">Ngôn ngữ</label>
                <select name="language" id="language" className={cx('form-control')}>
                    <option value="vn">Tiếng Việt</option>
                    <option value="en">English</option>
                </select>
            </div>
            <button className={cx('btn-pay')} onClick={handlePay}>
                THANH TOÁN
            </button>
        </div>
    );
}

export default Create;
