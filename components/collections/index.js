import classNames from 'classnames/bind';
import { useEffect, useState, memo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import styles from '/styles/collections/collections.module.scss';
import Sidebar from './sidebar';
import ListProduct from './listProduct';

import * as productsServices from '/services/productsServices';

const cx = classNames.bind(styles);

function Collections({ isSearch = false }) {
    const router = useRouter();
    const categoryId = router.query.category_id;
    const [data, setData] = useState(null);
    const [sortPrice, setSortPrice] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if (categoryId) {
                const data = await productsServices.getProductByCategoryId(categoryId, { page: 1, size: 9 });
                if (data && !JSON.stringify(data) === '{}') {
                    setData(data);
                }
            }
        };
        getData();
    }, []);
    return (
        <>
            <Head>
                {data && <title>{isSearch ? `Keyword:  "${data?.keyword}"` : data?.title ?? null} - Hikaru Shop</title>}
            </Head>

            <div className="container">
                <div className={cx('content')}>
                    <div className={cx('sidebar')}>
                        <Sidebar setData={setData} sortPrice={sortPrice} setSortPrice={setSortPrice}></Sidebar>
                    </div>
                    <div className={cx('group-product')}>
                        <h1 className={cx('title')}>
                            {isSearch ? `Keyword: ${data?.keyword ?? ''}` : data?.title ?? ''}
                        </h1>
                        {/* <div className={cx('sort')}>
                            <span>Sắp xếp theo:</span>
                            <select>
                                <option value={0}>Mặc định</option>
                                <option value={1}>Từ A - Z</option>
                                <option value={2}>Từ Z - A</option>
                            </select>
                        </div> */}
                        <div>
                            <ListProduct sortPrice={sortPrice} setSortPrice={setSortPrice} data={data} setData={setData} isSearch={isSearch}></ListProduct>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(Collections);
