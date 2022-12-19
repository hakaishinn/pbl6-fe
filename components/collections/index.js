import classNames from 'classnames/bind';
import { useEffect, useState, memo } from 'react';

import styles from '/styles/collections/collections.module.scss';
import DefaultLayout from '/layout/defaultLayout';
import Sidebar from './sidebar';
import ListProduct from './listProduct';
import { useRouter } from 'next/router';

import * as productsServices from '/services/productsServices';

const cx = classNames.bind(styles);

function Collections({ isSearch = false }) {
    const router = useRouter();
    const categoryId = router.query.category_id;
    const [data, setData] = useState(null);

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
        <DefaultLayout>
            <div className="container">
                <div className={cx('content')}>
                    <div className={cx('sidebar')}>
                        <Sidebar></Sidebar>
                    </div>
                    <div className={cx('group-product')}>
                        <h1 className={cx('title')}>
                            {isSearch ? `Keyword: ${data?.keyword ?? ''}` : data?.title ?? ''}
                        </h1>
                        <div className={cx('sort')}>
                            <span>Sắp xếp theo:</span>
                            <select>
                                <option value={0}>Mặc định</option>
                                <option value={1}>Từ A - Z</option>
                                <option value={2}>Từ Z - A</option>
                            </select>
                        </div>
                        <div>
                            <ListProduct data={data} setData={setData} isSearch={isSearch}></ListProduct>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default memo(Collections);
