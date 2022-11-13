import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import styles from '/styles/landing/landing.module.scss';
import Header from '/components/landing/header';
import Footer from '/components/footer';
import Product from '/components/landing/product';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const cx = classNames.bind(styles);

const data = {
    name: 'Dragon Ball Supper - Chap 7',
    desc: 'Giải đấu sức mạnh do Đấng Toàn Năng làm “chủ xị” đã chính thức khởi tranh!! Vòng loại do các Thần Hủy Diệt tiến hành cũng đã xong, luật lệ cũng đã được ấn định: ngoại trừ vũ trụ chiến thắng, những vũ trụ thua cuộc đều sẽ bị hủy diệt. Goku đã phải khổ công chạy đôn chạy đáo để chọn ra 10 chiến binh xứng đáng nhất tham gia giải đấu như thế nào?',
    src: 'https://product.hstatic.net/200000343865/product/7_70_84ea866cbd8643dabfa7c8f209d23d83_master.jpg',
    endow: [
        'Nhận ưu đãi 20% khi mua trọn bộ',
        'Đổi trả thoải mái khi sản phẩm lỗi trong 7 ngày'
    ],
    src_endow: 'https://vn-live-01.slatic.net/p/4e00d6c5d8f6cbf8d53ecf1f6261c09f.jpg',
    price_endow_new: 450000,
    price_endow_old: 550000,
};
function Landing() {
    useEffect(() => {
        //call API
    },)
    return (
        <>
            <Head>
                <title>{data.name}</title>
                <meta name="description" content={data.desc} />
            </Head>
            <div className={cx('wrapper')}>
                <Header></Header>
                <div className={cx('content')}>
                    <div className="container">
                        <div className={cx('overview')} id="overview">
                            <Product src={data.src}></Product>
                            <div className={cx('desc')}>
                                <h1>{data.name}</h1>
                                <span>{data.desc}</span>
                            </div>
                        </div>
                        <div className={cx('product')} id="product">
                            <h2 className={cx('title')}>SẢN PHẨM TƯƠNG TỰ</h2>
                            <div className={cx('list-product')}>
                                <Product size="medium" src={data.src}></Product>
                                <Product size="medium" src={data.src}></Product>
                                <Product size="medium" src={data.src}></Product>
                            </div>
                        </div>
                        <div className={cx('endow')} id="endow">
                            <h2 className={cx('title')}>ƯU ĐÃI</h2>
                            <div className={cx('endow-item')}>
                                <img src={data.src_endow}></img>
                                <div className={cx('info')}>
                                    {data.endow && data.endow.map((item, index) => (
                                        <div key={index} className={cx('endow-desc')}>
                                            <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
                                            <span className={cx('endow-desc-item')}>{item}</span>
                                        </div>
                                    ))}
    
                                    <div className={cx('endow-price')}>
                                        <h4>GIÁ CHỈ CÒN:</h4>
                                        <span className={cx('price-new')}>{data.price_endow_new}đ</span>
                                        <span className={cx('price-old')}>{data.price_endow_old}đ</span>
                                        <br></br>
                                        <button>Mua ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('contact')} id="contact">
                    <h2 className={cx('title')}>THÔNG TIN LIÊN HỆ</h2>
                    <Footer landing></Footer>
                </div>
            </div>
        </>

    );
}

export default Landing;
