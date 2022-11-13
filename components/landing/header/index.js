/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';

import styles from '/styles/landing/header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <div className={cx('nav')}>
                    <ul>
                        <li>
                            <a href="#overview">GIỚI THIỆU</a>
                        </li>
                        <li>
                            <a href="#product">SẢN PHẨM</a>
                        </li>
                        <li>
                            <a href="#endow">ƯU ĐÃI</a>
                        </li>
                        <li>
                            <a href="#contact">LIÊN HỆ</a>
                        </li>
                    </ul>
                    <span>HOTLINE: 0254654767</span>
                </div>
            </div>
        </div>
    );
}

export default Header;
