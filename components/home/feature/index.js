import classNames from 'classnames/bind';
import styles from '/styles/home/feature.module.scss';

import Slider from 'react-slick';
import Product from '../product';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowNextIcon, ArrowPrevIcon } from '/components/Icons';

const cx = classNames.bind(styles);

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <button className={cx('prev-slick')} onClick={onClick}>
            <ArrowPrevIcon></ArrowPrevIcon>
        </button>
    );
}

function NextArrow(props) {
    const { onClick } = props;
    return (
        <button className={cx('next-slick')} onClick={onClick}>
            <ArrowNextIcon></ArrowNextIcon>
        </button>
    );
}

function Feature({ title, subTitle, isProduct = true, data = [] }) {
    const settings = {
        infinite: true,
        slidesToShow: 5,
        swipeToSlide: true,
        prevArrow: <PrevArrow></PrevArrow>,
        nextArrow: <NextArrow></NextArrow>,
    };
    const classBoxShadow = cx('content');

    return (
        <div className={isProduct ? classBoxShadow : ''}>
            <div className="container">
                <div className={cx('featured')}>
                    <div className={cx('featured-title')}>
                        <h2>{title}</h2>
                        <p>{subTitle}</p>
                    </div>

                    <div className={cx('list-product')}>
                        {isProduct ? (
                            <Slider {...settings}>
                                {data.map((product) => (
                                    <Product
                                    key={product.id}
                                        data = {product}
                                    ></Product>
                                ))}
                            </Slider>
                        ) : (
                            <div className={cx('partner')}>
                                <div className={cx('vietnam-post')}>
                                    <div className={cx('partner-content')}>
                                        <img src="/images/vnpost.png" alt="VN POST"></img>
                                        <div>
                                            <p className={cx('desc')}>
                                                Giao hàng đến 63 tỉnh thành trên toàn quốc. Đối tác vận chuyển chính của
                                                Hikaru Tổng công ty Bưu điện Việt Nam được hình thành trên cơ sở triển
                                                khai Đề án thí điểm hình thành Tập đoàn Bưu chính Viễn thông Việt Nam
                                                (Tập đoàn VNPT) do Thủ tướng Chính phủ phê duyệt tại Quyết định số
                                                58/2005/QĐ-TTg ngày 23/3/2005.
                                            </p>
                                            <h4 className={cx('name')}>VNPOST</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('grab')}>
                                    <div className={cx('partner-content')}>
                                        <img src="/images/grab.png" alt="VN POST"></img>
                                        <div>
                                            <p className={cx('desc')}>
                                                Giao hàng trong ngày tại Tp Hồ Chí Minh. Đối tác vận chuyển tin cậy của
                                                Hikaru. Công ty TNHH Grab. Địa chỉ: Tòa nhà Mapletree Business Centre,
                                                1060 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, Thành phố Hồ Chí Minh,
                                                Việt Nam. Mã số doanh nghiệp: 0312650437
                                            </p>
                                            <h4 className={cx('name')}>GRAB</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('ghn')}>
                                    <div className={cx('partner-content')}>
                                        <img src="/images/ghn.png" alt="VN POST"></img>
                                        <div>
                                            <p className={cx('desc')}>
                                                Công ty giao nhận đầu tiên tại Việt Nam được thành lập với sứ mệnh phục
                                                vụ nhu cầu vận chuyển chuyên nghiệp của các đối tác Thương mại điện tử
                                                trên toàn quốc. Giấy CNĐKDN: 0311 907 295 do Sở Kế Hoạch và Đầu Tư TP
                                                HCM cấp lần đầu ngày 02/08/2012, cấp thay đổi lần thứ 16 ngày 10/5/2019.
                                            </p>
                                            <h4 className={cx('name')}>GIAO HÀNG NHANH</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Feature;
