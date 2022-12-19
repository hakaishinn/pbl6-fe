import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import styles from '/styles/products/productDetail.module.scss';
import DefaultLayout from '/layout/defaultLayout';
import { CheckIcon } from '/components/Icons';
import Quantity from '../quantity';
import { AppContext } from '/context/appProvider.js';

import * as cartServices from '/services/cartServices';
import * as productsServices from '/services/productsServices';

const cx = classNames.bind(styles);

function ProductDetail() {
    const { setQuantityCart, user, setIsShowLogin } = useContext(AppContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isComment, setIsComment] = useState(false);

    const router = useRouter();
    const id = router.query.id;

    const getQuantity = (childData) => {
        setQuantity(childData);
    };

    const newPrice = product?.price ? product.price - product.price * product.discount : 0;
    const handleBuy = async () => {
        await handleAddToCart();
        router.push('/cart');
    };

    const handleAddToCart = async () => {
        if (user) {
            if (product) {
                await cartServices.addCartItem(product.idProduct, user.idUser, parseInt(quantity));
                setQuantityCart((prev) => prev + quantity);
                alert('Thêm thành công');
            }
        } else {
            setIsShowLogin(true);
        }
    };

    useEffect(() => {
        const getData = async () => {
            if (id) {
                const data_products = await productsServices.getProductById(id);
                console.log(data_products);
                if (data_products) {
                    setProduct(data_products);
                }
            }
        };
        getData();
    }, [id]);

    return (
        <DefaultLayout>
            {product ? (
                <div className="container">
                    <div className={cx('wrapper')}>
                        <div className={cx('info')}>
                            <div className={cx('image')}>
                                <img src={product.image} alt={product.name}></img>
                            </div>
                            <div className={cx('information-product')}>
                                <h1 className={cx('name')}>{product.name}</h1>
                                <div className={cx('id-product')}>Mã sản phẩm: {product.idProduct}</div>
                                <div className={cx('save')}>
                                    Tiết kiệm được: {`${product.discount * 100}%`}
                                </div>
                                <div className={cx('price')}>
                                    <span>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            newPrice,
                                        )}
                                    </span>
                                    <span>
                                        {product.price !== newPrice
                                            ? new Intl.NumberFormat('vi-VN', {
                                                  style: 'currency',
                                                  currency: 'VND',
                                              }).format(product.price || 0)
                                            : ''}
                                    </span>
                                </div>
                                <div className={cx('quantity')}>
                                    <div>Số lượng</div>
                                    <Quantity product={product} parentCallback={getQuantity}></Quantity>
                                </div>
                                <button className={cx('btn-buy')} onClick={handleBuy}>
                                    MUA NGAY
                                </button>
                                <button className={cx('add-to-cart')} onClick={handleAddToCart}>
                                    THÊM VÀO GIỎ
                                </button>
                                <div className={cx('endow')}>
                                    <div>Ưu đãi dành cho khách hàng:</div>
                                    <ul>
                                        <li>
                                            <CheckIcon
                                                width="14px"
                                                height="14px"
                                                className={cx('check-icon')}
                                            ></CheckIcon>
                                            Có thể nhận hàng tại shop.
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <CheckIcon
                                                width="14px"
                                                height="14px"
                                                className={cx('check-icon')}
                                            ></CheckIcon>
                                            Giao hàng toàn quốc. Thời gian giao hàng từ 3 - 7 ngày, Tính từ ngày bạn
                                            nhận được email giao hàng.
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <CheckIcon
                                                width="14px"
                                                height="14px"
                                                className={cx('check-icon')}
                                            ></CheckIcon>
                                            Bọc plastic miễn phí cho Light Novel đặt mua trước ngày phát hành dự kiến.
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <CheckIcon
                                                width="14px"
                                                height="14px"
                                                className={cx('check-icon')}
                                            ></CheckIcon>
                                            Tặng bao bảo vệ cho mọi sản phẩm.
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <CheckIcon
                                                width="14px"
                                                height="14px"
                                                className={cx('check-icon')}
                                            ></CheckIcon>{' '}
                                            Đổi trả trong 15 ngày.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx('deliver')}>
                                <div className={cx('header')}>
                                    <div className={cx('title')}>
                                        Hikaru Giao Hàng đến 63 Tỉnh Thành Trên Toàn Quốc.
                                    </div>
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
                            <button className={cx({ active: !isComment })} onClick={() => setIsComment(!isComment)}>
                                Mô tả chi tiết
                            </button>
                            <button className={cx({ active: isComment })} onClick={() => setIsComment(!isComment)}>
                                Bình luận
                            </button>

                            <div className={cx('desc-detail-text')}>
                                {isComment ? (
                                    <div className={cx('desc-content')}>
                                        <h3>Bình luận</h3>
                                        <span>0 bình luận</span>

                                        <div className={cx('comments')}>
                                            <input placeholder="Viết bình luận"></input>
                                            <button>Đăng</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('desc-content')}>
                                        {product.desc?.includes(';') ? (
                                            product.desc.split(';').map((item, index) => <p key={index}>{item}</p>)
                                        ) : (
                                            <p>{product.desc}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : undefined}
        </DefaultLayout>
    );
}

export default ProductDetail;
