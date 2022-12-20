import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from '/styles/collections/listProduct.module.scss';
import Product from '../product';
import * as productsServices from '/services/productsServices';
import { LoadingSkeleton } from '../../loading';

const cx = classNames.bind(styles);

function ListProduct({ isSearch, data, setData }) {
    const router = useRouter();

    const {
        query: { category_id, name },
    } = router;

    const pageCount = data?.data?.totalPage || 0;

    const handlePageClick = async (event) => {
        console.log(event.selected);
        if (isSearch) {
            if (name) {
                const data = await productsServices.search(name, {
                    page: event.selected + 1,
                    size: 9,
                });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                setData(data);
            }
        } else {
            if (category_id) {
                const data = await productsServices.getProductByCategoryId(category_id, {
                    page: event.selected + 1,
                    size: 9,
                });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                setData(data);
            }
        }
    };

    useEffect(() => {
        const loadDataPageOne = async () => {
            if (isSearch) {
                if (name) {
                    const data = await productsServices.search(name, {
                        page: 1,
                        size: 9,
                    });
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                    setData(data);
                }
            } else {
                if (category_id) {
                    const data = await productsServices.getProductByCategoryId(category_id, {
                        page: 1,
                        size: 9,
                    });
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                    setData(data);
                }
            }
        };
        loadDataPageOne();
    }, [category_id, name]);

    return (
        <>
            <div className={cx('list-product')}>
                {!data
                    ? Array(6)
                          .fill(0)
                          .map((item, index) => <LoadingSkeleton key={index} className={'collection-product'}></LoadingSkeleton>)
                    : data?.data?.data?.map((product) => <Product key={product.idProduct} product={product}></Product>)}
            </div>
            {data?.data?.data ? (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName={cx('pagination')}
                    pageLinkClassName={cx('page-num')}
                    previousLinkClassName={cx('page-num')}
                    nextLinkClassName={cx('page-num')}
                    activeLinkClassName={cx('active')}
                />
            ) : undefined}
        </>
    );
}

export default ListProduct;
