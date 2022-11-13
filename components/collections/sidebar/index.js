import classNames from 'classnames/bind';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { memo } from 'react';

import CallApi from '/utils/callApi';
import styles from '/styles/collections/sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar({categories}) {
    function onChangeValue(event) {
        console.log(event.target.value);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category')}>
                <div className={cx('title')}>
                    <h2>DANH MỤC SẢN PHẨM</h2>
                </div>
                <div className={cx('category-list')}>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id} className={cx('category-item')}>
                                <Link href={`/collections/${category.id}`}>{category.category_type}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={cx('filter')}>
                <div className={cx('title')}>
                    <h2>BỘ LỌC SẢN PHẨM</h2>
                </div>
                <div className={cx('price')} onChange={onChangeValue}>
                    <h2 className={cx('sub-title')}>Giá</h2>
                    <div className={cx('price-item')}>
                        <input type={'radio'} id="price1" name="filter-price" value={1}></input>
                        <label htmlFor="price1">Dưới 50,000đ</label>
                    </div>

                    <div className={cx('price-item')}>
                        <input type={'radio'} id="price2" name="filter-price" value={2}></input>
                        <label htmlFor="price2">50,000đ - 100,000đ</label>
                    </div>

                    <div className={cx('price-item')}>
                        <input type={'radio'} id="price3" name="filter-price" value={3}></input>
                        <label htmlFor="price3">Trên 100,000đ</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Sidebar);
