import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from '/styles/navbar.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import CallApi from '/utils/callApi';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Navbar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CallApi('categories').then((res) => {
            setCategories(res.data);
        });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <ul className={cx('navbar')}>
                    <span>
                        <HeadlessTippy
                            offset={[0, 1]}
                            placement="bottom"
                            interactive
                            render={(attrs) => (
                                <div className={cx('subnav-homepage')} tabIndex="-1" {...attrs}>
                                    <ul>
                                        <li>
                                            <Link href="/">Điều khoản sử dụng</Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        >
                            <li className={cx('li-nav')}>
                                <Link href="/" className={cx('nav-item')}>
                                    TRANG CHỦ
                                </Link>
                            </li>
                        </HeadlessTippy>
                    </span>

                    <span>
                        <HeadlessTippy
                            offset={[0, 1]}
                            placement="bottom-start"
                            interactive
                            render={(attrs) => (
                                <div className={cx('subnav-homepage')} tabIndex="-1" {...attrs}>
                                    <ul>
                                        {categories.map((category) => (
                                            <li key={category.id}>
                                                <Link href={`/collections/${category.id}`}>{category.category_type}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        >
                            <li className={cx('li-nav')}>
                                <Link href="/collections/1" className={cx('nav-item')}>
                                    TRUYỆN TRANH
                                </Link>
                            </li>
                        </HeadlessTippy>
                    </span>
                    <span>
                        <li className={cx('li-nav')}>
                            <Link href="/collections/2" className={cx('nav-item')}>
                                LIGHT NOVEL
                            </Link>
                        </li>
                    </span>
                    <span>
                        <li className={cx('li-nav')}>
                            <Link href="/collections/6" className={cx('nav-item')}>
                                VẬT PHẨM
                            </Link>
                        </li>
                    </span>

                    <span>
                        <HeadlessTippy
                            offset={[0, 1]}
                            placement="bottom-start"
                            interactive
                            render={(attrs) => (
                                <div className={cx('subnav-homepage')} tabIndex="-1" {...attrs}>
                                    <ul>
                                        <li>
                                            <Link href="/">Thanh toán</Link>
                                        </li>
                                        <li>
                                            <Link href="/">Chính sách đổi trả</Link>
                                        </li>
                                        <li>
                                            <Link href="/">Phí giao hàng</Link>
                                        </li>
                                        <li>
                                            <Link href="/">Chính sách giao hàng</Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        >
                            <li className={cx('li-nav')}>
                                <Link href="/" className={cx('nav-item')}>
                                    HƯỚNG DẪN CẦN BIẾT
                                </Link>
                            </li>
                        </HeadlessTippy>
                    </span>

                    <span>
                        <li className={cx('li-nav')}>
                            <Link href="/" className={cx('nav-item')}>
                                LIÊN HỆ
                            </Link>
                        </li>
                    </span>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
