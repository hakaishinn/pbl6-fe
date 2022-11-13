import classNames from 'classnames/bind';

import styles from '/styles/products/productDetail.module.scss';
import DefaultLayout from '/layout/defaultLayout';
import { CheckIcon } from '/components/Icons';
import Quantity from '../quantity';

const cx = classNames.bind(styles);

function ProductDetail({ product }) {
    const newPrice = product.price - product.price * product.discount_person

    const handleAddToCart = () => {
        router.push('/cart');
    };
    return (
        <DefaultLayout>
            <div className="container">
                <div className={cx('wrapper')}>
                    <div className={cx('info')}>
                        <div className={cx('image')}>
                            <img src={product.image}></img>
                        </div>
                        <div className={cx('information-product')}>
                            <h1 className={cx('name')}>{product.name}</h1>
                            <div className={cx('id-product')}>Mã sản phẩm: {product.id}</div>
                            <div className={cx('save')}>Tiết kiệm được: {`${product.discount_person * 100}%`}</div>
                            <div className={cx('price')}>
                                <span>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                        newPrice,
                                    )}
                                </span>
                                <span>
                                    {product.price !== newPrice
                                        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                              product.price,
                                          )
                                        : ''}
                                </span>
                            </div>
                            <div className={cx('quantity')}>
                                <div>Số lượng</div>
                                <Quantity></Quantity>
                            </div>
                            <button
                                className={cx('btn-buy')}
                                onClick={() => {
                                    router.push('/cart');
                                }}
                            >
                                MUA NGAY
                            </button>
                            <button className={cx('add-to-cart')} onClick={handleAddToCart}>
                                THÊM VÀO GIỎ
                            </button>
                            <div className={cx('endow')}>
                                <div>Ưu đãi dành cho khách hàng:</div>
                                <ul>
                                    <li>
                                        <CheckIcon width="14px" height="14px" className={cx('check-icon')}></CheckIcon>
                                        Có thể nhận hàng tại shop.
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <CheckIcon width="14px" height="14px" className={cx('check-icon')}></CheckIcon>
                                        Giao hàng toàn quốc. Thời gian giao hàng từ 3 - 7 ngày, Tính từ ngày bạn nhận
                                        được email giao hàng.
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <CheckIcon width="14px" height="14px" className={cx('check-icon')}></CheckIcon>
                                        Bọc plastic miễn phí cho Light Novel đặt mua trước ngày phát hành dự kiến.
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <CheckIcon width="14px" height="14px" className={cx('check-icon')}></CheckIcon>
                                        Tặng bao bảo vệ cho mọi sản phẩm.
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <CheckIcon width="14px" height="14px" className={cx('check-icon')}></CheckIcon>{' '}
                                        Đổi trả trong 15 ngày.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('deliver')}>
                            <div className={cx('header')}>
                                <div className={cx('title')}>Hikaru Giao Hàng đến 63 Tỉnh Thành Trên Toàn Quốc.</div>
                                <div className={cx('desc')}>
                                    Từ 1-7 ngày làm việc (Không tính Thứ Bảy, CN và Các Ngày Nghỉ Lễ)
                                </div>
                            </div>
                            <div className={cx('body')}>
                                <div className={cx('deliver-item')}>
                                    <img src="/images/ghmp.png"></img>
                                    <div>
                                        <div className={cx('deliver-item-title')}>Giao hàng miễn phí</div>
                                        <div className={cx('deliver-item-desc')}>
                                            ĐH từ 250.000đ nội thành TP.HCM - 500.000đ trên toàn quốc
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('deliver-item')}>
                                    <img src="/images/dtmp.png"></img>
                                    <div>
                                        <div className={cx('deliver-item-title')}>Đổi trả miễn phí</div>
                                        <div className={cx('deliver-item-desc')}>Đổi trả miễn phí 15 ngày</div>
                                    </div>
                                </div>
                                <div className={cx('deliver-item')}>
                                    <img src="/images/ttknh.png"></img>
                                    <div>
                                        <div className={cx('deliver-item-title')}>Thanh toán</div>
                                        <div className={cx('deliver-item-desc')}>Thanh toán khi nhận hàng</div>
                                    </div>
                                </div>
                                <div className={cx('deliver-item')}>
                                    <img src="/images/htol.png"></img>
                                    <div>
                                        <div className={cx('deliver-item-title')}>Hỗ trợ online</div>
                                        <div className={cx('deliver-item-desc')}>090 998 28 73</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('desc-detail')}>
                        <button>Mô tả chi tiết</button>
                        <div className={cx('desc-detail-text')}>
                            <div className={cx('desc-content')}>
                                <p>Mã EAN 8935244877731</p>
                                <p>Tác giả Tatsuki Nohda</p>
                                <p>Người dịch Trang Tempo</p>
                                <p>Giá bìa 20.000</p>
                                <p>Loại bìa Mềm</p>
                                <p>Khổ 11.3x17.6</p>
                                <p>Số trang 192</p>
                                <p>Thể loại Truyện tranh đen trắng</p>
                                <p>Đối tượng Dành cho lứa tuổi 12+</p>
                                <p>Nhà xuất bản NXB Kim Đồng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default ProductDetail;
