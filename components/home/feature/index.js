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
        speed: 1500,
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
                                    <Product key={product.idProduct} product={product}></Product>
                                ))}
                            </Slider>
                        ) : (
                            <div className={cx('partner')}>
                                <div className={cx('vietnam-post')}>
                                    <div className={cx('partner-content')}>
                                        <img src="/images/vnpost.png" alt="VN POST"></img>
                                        <div>
                                            <p className={cx('desc')}>
                                                Giao h??ng ?????n 63 t???nh th??nh tr??n to??n qu???c. ?????i t??c v???n chuy???n ch??nh c???a
                                                Hikaru T???ng c??ng ty B??u ??i???n Vi???t Nam ???????c h??nh th??nh tr??n c?? s??? tri???n
                                                khai ????? ??n th?? ??i???m h??nh th??nh T???p ??o??n B??u ch??nh Vi???n th??ng Vi???t Nam
                                                (T???p ??o??n VNPT) do Th??? t?????ng Ch??nh ph??? ph?? duy???t t???i Quy???t ?????nh s???
                                                58/2005/Q??-TTg ng??y 23/3/2005.
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
                                                Giao h??ng trong ng??y t???i Tp H??? Ch?? Minh. ?????i t??c v???n chuy???n tin c???y c???a
                                                Hikaru. C??ng ty TNHH Grab. ?????a ch???: T??a nh?? Mapletree Business Centre,
                                                1060 Nguy???n V??n Linh, Ph?????ng T??n Phong, Qu???n 7, Th??nh ph??? H??? Ch?? Minh,
                                                Vi???t Nam. M?? s??? doanh nghi???p: 0312650437
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
                                                C??ng ty giao nh???n ?????u ti??n t???i Vi???t Nam ???????c th??nh l???p v???i s??? m???nh ph???c
                                                v??? nhu c???u v???n chuy???n chuy??n nghi???p c???a c??c ?????i t??c Th????ng m???i ??i???n t???
                                                tr??n to??n qu???c. Gi???y CN??KDN: 0311 907 295 do S??? K??? Ho???ch v?? ?????u T?? TP
                                                HCM c???p l???n ?????u ng??y 02/08/2012, c???p thay ?????i l???n th??? 16 ng??y 10/5/2019.
                                            </p>
                                            <h4 className={cx('name')}>GIAO H??NG NHANH</h4>
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
