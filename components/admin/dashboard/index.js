import classNames from 'classnames/bind';
import { faReceipt, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

import styles from '/styles/admin/dashboard.module.scss';
import Card from '../card';
import * as orderServices from '/services/orderServices';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);
function Dashboard() {
    const monthRef = useRef();
    const yearRef = useRef();

    const [current, setCurrent] = useState(null);
    const [present, setPresent] = useState(null);
    const [past, setPast] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const totalPrice = (data) => {
        if (!data) return 0;
        return data.reduce((acc, item) => acc + item.total, 0);
    };

    const totalProduct = (data) => {
        if (!data) return 0;
        return data.reduce((acc, item) => acc + item.quantity, 0);
    };

    const percentPriceLastMonth = (present, past) => {
        if (present && past) {
            const pricePresent = present.reduce((acc, item) => acc + item.total, 0);
            const pricePast = past.reduce((acc, item) => acc + item.total, 0);

            if (pricePast === 0) return 100;
            const percent = pricePresent / pricePast;
            if (percent >= 1) {
                return Math.floor((percent - 1) * 100);
            } else {
                return (1 - percent) * 100;
            }
        }
        return 0;
    };

    const percentOrderLastMonth = (present, past) => {
        if (present && past) {
            const orderPresent = present.length;
            const orderPast = past.length;

            if (orderPast === 0) return 100;
            const percent = orderPresent / orderPast;
            if (percent >= 1) {
                return Math.floor((percent - 1) * 100);
            } else {
                return (1 - percent) * 100;
            }
        }
        return 0;
    };

    const percentProductLastMonth = (present, past) => {
        if (present && past) {
            const productPresent = present.reduce((acc, item) => acc + item.quantity, 0);
            const productPast = past.reduce((acc, item) => acc + item.quantity, 0);

            if (productPast === 0) return 100;
            const percent = productPresent / productPast;
            if (percent >= 1) {
                return Math.floor((percent - 1) * 100);
            } else {
                return (1 - percent) * 100;
            }
        }
        return 0;
    };

    useEffect(() => {
        const getData = async () => {
            if (!month) {
            } else {
                if (month !== 1) {
                    const res_present = await orderServices.getStatistical(year, { month });
                    setCurrent(res_present);
                    setPresent(res_present);
                    const res_past = await orderServices.getStatistical(year, { month: month - 1 });
                    setPast(res_past);
                } else {
                    const res_present = await orderServices.getStatistical(year, { month });
                    setCurrent(present);
                    setPresent(res_present);
                    const res_past = await orderServices.getStatistical(year - 1, { month: 12 });
                    setPast(res_past);
                }
            }
        };
        getData();
    }, [month, year]);

    return (
        <div className={cx('wrapper')}>
            <h1>Tổng quan</h1>
            <div className={cx('card')}>
                <Card
                    icon={faSackDollar}
                    title={'Tiền của tháng này'}
                    value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        totalPrice(present?.data),
                    )}
                    growth={percentPriceLastMonth(present?.data, past?.data)}
                    footer="tháng trước"
                ></Card>
                <Card
                    color={'green'}
                    icon={faReceipt}
                    title={'Đơn hàng'}
                    value={current?.totalOrder}
                    growth={percentOrderLastMonth(present?.data, past?.data)}
                    footer="tháng trước"
                ></Card>
                <Card
                    icon={faProductHunt}
                    color={'blue'}
                    title={'Sản phẩm bán được'}
                    value={totalProduct(present?.data)}
                    growth={percentProductLastMonth(present?.data, past?.data)}
                    footer="tháng trước"
                ></Card>
            </div>

            <div className={cx('form-input')}>
                <input ref={monthRef} placeholder="Nhập tháng(VD: 12)"></input>
                <input ref={yearRef} placeholder="Nhập năm(VD: 2022)"></input>
                <button
                    onClick={() => {
                        if (monthRef.current.value.length === 0 && yearRef.current.value.length === 0) return;
                        setMonth(monthRef.current.value);
                        setYear(yearRef.current.value);
                    }}
                >
                    Lấy dữ liệu
                </button>
            </div>

            {current && current.data.length > 0 && (
                <div className={cx('table')}>
                    <h3>
                        Dữ liệu tháng {month}/{year}
                    </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {current.data.length > 0 &&
                                current.data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.total}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
