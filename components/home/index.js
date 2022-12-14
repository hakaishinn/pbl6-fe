import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira } from '@fortawesome/free-brands-svg-icons';

import * as productsServices from '/services/productsServices';

import styles from '/styles/home/home.module.scss';
import {
    ArrowNextIcon,
    ArrowPrevIcon,
    BookSolidIcon,
    HeartSolidIcon,
    RocketSolidIcon,
    TagSolidIcon,
    UserIcon,
} from '/components/Icons';
import Feature from './feature';
import DefaultLayout from '/layout/defaultLayout';
import { useEffect, useState } from 'react';

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

export default function Home() {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        pauseOnHover: false,
        prevArrow: <PrevArrow></PrevArrow>,
        nextArrow: <NextArrow></NextArrow>,
    };

    const [productsFull, setProductsFull] = useState([]);
    const [gifts, setGifts] = useState([]);
    const [productsNew, setProductsNew] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const productsNew = await productsServices.getProductsNew({ size: 12 });
            if (productsNew && productsNew.length > 0) {
                setProductsNew(productsNew);
            }
            const productsFull = await productsServices.getProductByCategoryId(5, { page: 1, size: 12 });
            if (productsFull && productsFull.data && productsFull.data.data && productsFull.data.data.length > 0) {
                setProductsFull(productsFull.data.data);
            }
            const gifts = await productsServices.getProductByCategoryId(6, { page: 1, size: 12 });
            if (gifts && gifts.data && gifts.data.data && gifts.data.data.length > 0) {
                setGifts(gifts.data.data);
            }
        };
        getData();
    }, []);

    return (
        <>
            <Slider {...settings}>
                <div className={cx('slider')}>
                    <img src="/images/slide1.png" alt="slider1"></img>
                </div>
                <div className={cx('slider')}>
                    <img src="/images/slide2.png" alt="slider1"></img>
                </div>
                <div className={cx('slider')}>
                    <img src="/images/slide3.png" alt="slider1"></img>
                </div>
            </Slider>

            <div className="container">
                <div className={cx('all-status')}>
                    <div className={cx('manga')}>
                        <div className={cx('border')}>
                            <BookSolidIcon></BookSolidIcon>
                            <h2>
                                Những Bản Manga mới nhất <span>3000+</span>
                            </h2>
                        </div>
                    </div>

                    <div className={cx('customer')}>
                        <div className={cx('border')}>
                            <UserIcon></UserIcon>
                            <h2>
                                Khách hàng thân thiết <span>999+</span>
                            </h2>
                        </div>
                    </div>

                    <div className={cx('light-novel')}>
                        <div className={cx('border')}>
                            <HeartSolidIcon></HeartSolidIcon>
                            <h2>
                                Thế Giới của Light Novel <span>300+</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <Feature
                data={productsNew}
                title="Sản phẩm mới nhất"
                subTitle="Danh sách sản phẩm mới nhất của chúng tôi"
            ></Feature>
            <Feature data={productsFull} title="Truyện nguyên bộ" subTitle="Mua nguyên bộ để nhận ưu đãi sốc"></Feature>
            <div className={cx('collection-count')}>
                <div className="container">
                    <div className={cx('collection-row')}>
                        <div className={cx('collection-item', 'collection-manga')}>
                            <div className={cx('icon', 'collection-icon-manga')}>
                                <UserIcon width="3.2rem" height="3.2rem"></UserIcon>
                            </div>
                            <div className={cx('title')}>
                                <h2 className={cx('name')}>Manga</h2>
                                <h3 className={cx('counter')}>3535</h3>
                            </div>
                        </div>

                        <div className={cx('collection-item', 'collection-light-novel')}>
                            <div className={cx('icon', 'collection-icon-light-novel')}>
                                <BookSolidIcon width="3.2rem" height="3.2rem"></BookSolidIcon>
                            </div>
                            <div className={cx('title')}>
                                <h2 className={cx('name')}>Light Novel</h2>
                                <h3 className={cx('counter')}>700</h3>
                            </div>
                        </div>

                        <div className={cx('collection-item', 'collection-vanhoc')}>
                            <div className={cx('icon', 'collection-icon-vanhoc')}>
                                <BookSolidIcon width="3.2rem" height="3.2rem"></BookSolidIcon>
                            </div>
                            <div className={cx('title')}>
                                <h2 className={cx('name')}>Văn học</h2>
                                <h3 className={cx('counter')}>219</h3>
                            </div>
                        </div>

                        <div className={cx('collection-item', 'collection-vatpham')}>
                            <div className={cx('icon', 'collection-icon-vatpham')}>
                                <BookSolidIcon width="3.2rem" height="3.2rem"></BookSolidIcon>
                            </div>
                            <div className={cx('title')}>
                                <h2 className={cx('name')}>Vật phẩm</h2>
                                <h3 className={cx('counter')}>60</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Feature
                data={gifts}
                title="Vật phẩm - Quà tặng"
                subTitle="Nhanh tay chọn lựa những sản phẩm đang giảm giá"
            ></Feature>
            <Feature data={productsFull} isProduct={false} title="Đối tác vận chuyển"></Feature>
            <div className={cx('services')}>
                <div className="container">
                    <div className={cx('services-row')}>
                        <div className={cx('service-item')}>
                            <RocketSolidIcon
                                width="3.2rem"
                                height="3.2rem"
                                className={cx('icon-rocket')}
                            ></RocketSolidIcon>
                            <h3>GIAO HÀNG TẬN NƠI</h3>
                            <p>Dù Bạn Ở Bất Cứ Nơi Đâu</p>
                        </div>

                        <div className={cx('service-item')}>
                            <TagSolidIcon width="3.2rem" height="3.2rem" className={cx('icon-tag')}></TagSolidIcon>
                            <h3>PHỤC VỤ TẬN TÌNH</h3>
                            <p>Niềm Vui Của Bạn Là Hạnh Phúc Của Hikaru</p>
                        </div>

                        <div className={cx('service-item')}>
                            <FontAwesomeIcon className={cx('icon-envira')} icon={faEnvira}></FontAwesomeIcon>
                            <h3>SẢN PHẨM CHẤT LƯỢNG</h3>
                            <p>Hàng Hóa Chính Hãng 100%.</p>
                        </div>

                        <div className={cx('service-item')}>
                            <HeartSolidIcon
                                width="3.2rem"
                                height="3.2rem"
                                className={cx('icon-heart')}
                            ></HeartSolidIcon>
                            <h3>BÁN HÀNG VÌ ĐAM MÊ</h3>
                            <p>Bán Hàng Bằng Cả Trái Tim</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
