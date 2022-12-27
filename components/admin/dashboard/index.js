import classNames from 'classnames/bind';
import { faReceipt, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import ReactPaginate from 'react-paginate';

import styles from '/styles/admin/dashboard.module.scss';
import Card from '../card';
import * as orderServices from '/services/orderServices';
import { useEffect, useRef, useState } from 'react';
import validator from '/utils/validator';

const cx = classNames.bind(styles);
function Dashboard() {
    const monthRef = useRef();
    const errorMonthRef = useRef();
    const yearRef = useRef();
    const errorYearRef = useRef();

    const [current, setCurrent] = useState(null);
    const [present, setPresent] = useState(null);
    const [past, setPast] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [itemOffset, setItemOffset] = useState(0);
    const [forcePage, setForPage] = useState(0);
    const [isRef, setIsRef] = useState(true);

    const itemsPerPage = 9;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = current?.data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(current?.data?.length / itemsPerPage) || 0;

    const handlePageClick = async (event) => {
        const newOffset = (event.selected * itemsPerPage) % current?.data?.length;
        setForPage(newOffset / itemsPerPage);
        setItemOffset(newOffset);
    };

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

    useEffect(() => {
        if (monthRef.current) {
            monthRef.current.addEventListener('input', () => {
                monthRef.current.classList.remove('error');
                errorMonthRef.current.style.opacity = 0;
            });
        } else {
            setIsRef(false);
        }

        if (yearRef.current) {
            yearRef.current.addEventListener('input', () => {
                yearRef.current.classList.remove('error');
                errorYearRef.current.style.opacity = 0;
            });
        }
    }, [monthRef.current, yearRef.current]);

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
                    value={current?.totalOrder || 0}
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
                <span ref={errorMonthRef} className={cx('message-error')}>
                    Không được để trống trường này
                </span>
                <input ref={yearRef} placeholder="Nhập năm(VD: 2022)"></input>
                <span ref={errorYearRef} className={cx('message-error')}>
                    Không được để trống trường này
                </span>
                <button
                    onClick={() => {
                        const isMonth = validator(monthRef, errorMonthRef, ['required']);
                        const isYear = validator(yearRef, errorYearRef, ['required']);

                        if (isMonth && isYear) {
                            setMonth(monthRef.current.value);
                            setYear(yearRef.current.value);
                            setItemOffset(0);
                            setForPage(0);
                        }
                    }}
                >
                    Lấy dữ liệu
                </button>
            </div>

            {currentItems?.length > 0 && (
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
                            {currentItems?.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(item.total)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <ReactPaginate
                        forcePage={forcePage}
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        containerClassName={cx('pagination')}
                        pageLinkClassName={cx('page-num')}
                        previousLinkClassName={cx('page-num')}
                        nextLinkClassName={cx('page-num')}
                        activeLinkClassName={cx('active')}
                    />
                </div>
            )}
        </div>
    );
}

export default Dashboard;
