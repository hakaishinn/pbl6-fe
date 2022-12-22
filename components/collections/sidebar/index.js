import classNames from 'classnames/bind';
import Link from 'next/link';
import { memo, useEffect, useState } from 'react';

import styles from '/styles/collections/sidebar.module.scss';

import * as categoriesServices from '/services/categoriesServices';

import { LoadingSkeleton } from '../../loading';

const cx = classNames.bind(styles);

function Sidebar({ setSortPrice }) {
    const [categories, setCategories] = useState([]);

    const onChangeValue = async (event) => {
        if (event.target.value === 'no') {
            setSortPrice(null);
        } else {
            setSortPrice(event.target.value);
        }
    };

    useEffect(() => {
        const getData = async () => {
            if (categories.length <= 0) {
                const data_categories = await categoriesServices.getCategories();
                if (data_categories.length > 0) {
                    setCategories(data_categories);
                }
            }
        };
        getData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category')}>
                <div className={cx('title')}>
                    <h2>DANH MỤC SẢN PHẨM</h2>
                </div>
                <div className={cx('category-list')}>
                    <ul>
                        {categories.length === 0
                            ? Array(6)
                                  .fill(0)
                                  .map((item, index) => (
                                      <LoadingSkeleton key={index} className={'category'}></LoadingSkeleton>
                                  ))
                            : categories.map((category) => (
                                  <li key={category.id} className={cx('category-item')}>
                                      <Link href={`/collections/${category.id}`}>{category.categoryType}</Link>
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
                        <input type={'radio'} id="price1" name="filter-price" value={'no'} defaultChecked></input>
                        <label htmlFor="price1">Không lọc</label>
                    </div>
                    <div className={cx('price-item')}>
                        <input type={'radio'} id="price1" name="filter-price" value={'0-50000'}></input>
                        <label htmlFor="price1">Dưới 50,000đ</label>
                    </div>

                    <div className={cx('price-item')}>
                        <input type={'radio'} id="price2" name="filter-price" value={'50000-100000'}></input>
                        <label htmlFor="price2">Từ 50,000đ - 100,000đ</label>
                    </div>

                    <div className={cx('price-item')}>
                        <input type={'radio'} id="price3" name="filter-price" value={'100000-200000'}></input>
                        <label htmlFor="price3">Từ 100,000đ - 200,000đ</label>
                    </div>

                    <div className={cx('price-item')}>
                        <input type={'radio'} id="price4" name="filter-price" value={'200000-300000'}></input>
                        <label htmlFor="price4">Từ 200,000đ - 300,000đ</label>
                    </div>

                    <div className={cx('price-item')}>
                        <input type={'radio'} id="price5" name="filter-price" value={'300000-500000'}></input>
                        <label htmlFor="price5">Từ 300,000đ - 500,000đ</label>
                    </div>

                    <div className={cx('price-item')}>
                        <input type={'radio'} id="price6" name="filter-price" value={'500000-999999999'}></input>
                        <label htmlFor="price6">Trên 500,000đ</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Sidebar);
