import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import classNames from 'classnames/bind';

import styles from '/styles/footer.module.scss';
import { ArrowNextIcon, EmailIcon, LocationIcon, PhoneIcon } from '../Icons';
import Link from 'next/link';

const cx = classNames.bind(styles);

function Footer({ landing = false }) {
    const classes = cx('wrapper', { landing });
    return (
        <div className={classes}>
            <div className="container">
                <div className={cx('content')}>
                    <div className={cx('website')}>
                        <h4 className={cx('title')}>WEBSITE THUỘC QUYỀN</h4>
                        
                        <p>Công Ty Cổ Phần Xuất Bản và Thương mại HIKARU</p>
                        <p>Mã Số Thuế: 0317420275 Do Sở Kế Hoạch và Đầu Tư Tp Đà Nẵng cấp ngày 05/08/2022</p>
                        <p>Trụ Sở Chính: 54 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</p>
                    </div>
                    <div className={cx('contact')}>
                        <h4 className={cx('title')}>LIÊN HỆ</h4>
                        
                        <div className={cx('contact-item')}>
                            <LocationIcon></LocationIcon>
                            <p>54 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng</p>
                        </div>

                        <div className={cx('contact-item')}>
                            <PhoneIcon></PhoneIcon>
                            <p>038 507 8386</p>
                        </div>

                        <div className={cx('contact-item')}>
                            <EmailIcon></EmailIcon>
                            <p>hikarushop@gmail.com</p>
                        </div>
                    </div>
                    <div className={cx('policy')}>
                        <h4 className={cx('title')}>CHÍNH SÁCH CHUNG</h4>
                        
                        <div className={cx('policy-item')}>
                            <ArrowNextIcon></ArrowNextIcon>
                            <Link href="/pages/provision">Điều khoản sử dụng</Link>
                        </div>

                        <div className={cx('policy-item')}>
                            <ArrowNextIcon></ArrowNextIcon>
                            <Link href="/pages/pay">Chính sách thanh toán</Link>
                        </div>

                        <div className={cx('policy-item')}>
                            <ArrowNextIcon></ArrowNextIcon>
                            <Link href="/pages/returngoods">Chính sách đổi trả</Link>
                        </div>
                    </div>
                    <div className={cx('fanpage')}>
                        <h4 className={cx('title')}>FANPAGE</h4>
                        
                        <div className={cx('social')}>
                            <div className={cx('social-item')}>
                                <Link href="/">
                                    <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
                                </Link>
                            </div>
    
                            <div className={cx('social-item')}>
                                <Link href="/">
                                    <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                                </Link>
                            </div>
    
                            <div className={cx('social-item')}>
                                <Link href="/">
                                    <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                                </Link>
                            </div>
                            <div className={cx('social-item')}>
                                <Link href="/">
                                    <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                                </Link>
                            </div>
                            <div className={cx('social-item')}>
                                <Link href="/">
                                    <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
