import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import styles from '/styles/collections/listProduct.module.scss';
import Product from '../product';
import * as productsServices from '/services/productsServices';
import { LoadingSkeleton } from '../../loading';

const cx = classNames.bind(styles);

function ListProduct({ isSearch, data, setData, sortPrice, setSortPrice }) {
    const paginateRef = useRef();
    const router = useRouter();

    const {
        query: { category_id, name, page },
    } = router;

    const pageCount = data?.data?.totalPage || 0;

    const handlePageClick = async (event) => {
        if (sortPrice) {
            router.push({
                pathname: `/collections/${category_id}`,
                query: { page: event.selected + 1, sortPrice: sortPrice },
            });
        } else {
            router.push({
                pathname: `/collections/${category_id}`,
                query: { page: event.selected + 1 },
            });
        }
    };

    useEffect(() => {
        const loadData = async () => {
            if (isSearch) {
                if (name && page) {
                    const data = await productsServices.search(name, {
                        page: page,
                        size: 9,
                    });
                    setData(data);
                } else if (name && !page) {
                    const data = await productsServices.search(name, {
                        page: 1,
                        size: 9,
                    });
                    setData(data);

                    if (paginateRef?.current) {
                        paginateRef.current.state.selected = 0;
                    }
                }
            } else {
                if (category_id && page) {
                    if (sortPrice) {
                        const data = await productsServices.sortProductByPrice(category_id, {
                            star: parseInt(sortPrice.split('-')[0]),
                            end: parseInt(sortPrice.split('-')[1]),
                            page: page,
                            size: 9,
                        });
                        setData(data);
                    } else {
                        const data = await productsServices.getProductByCategoryId(category_id, {
                            page: page,
                            size: 9,
                        });
                        setData(data);
                    }
                } else if (category_id && !page) {
                    if (sortPrice) {
                        const data = await productsServices.sortProductByPrice(category_id, {
                            star: parseInt(sortPrice.split('-')[0]),
                            end: parseInt(sortPrice.split('-')[1]),
                            page: 1,
                            size: 9,
                        });
                        setData(data);
                    } else {
                        const data = await productsServices.getProductByCategoryId(category_id, {
                            page: 1,
                            size: 9,
                        });

                        if (paginateRef?.current) {
                            paginateRef.current.state.selected = 0;
                        }
                        setData(data);
                    }
                }
            }
        };
        loadData();
    }, [category_id, name, page, sortPrice]);
    return (
        <>
            <div className={cx('list-product')}>
                {!data
                    ? Array(6)
                          .fill(0)
                          .map((item, index) => (
                              <LoadingSkeleton key={index} className={'collection-product'}></LoadingSkeleton>
                          ))
                    : data?.data?.data?.map((product) => <Product key={product.idProduct} product={product}></Product>)}
            </div>
            {data?.data?.data.length > 0 ? (
                <ReactPaginate
                    forcePage={page ? page - 1 : 0}
                    ref={paginateRef}
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
            ) : <h2>Không có sản phẩm nào</h2>}
        </>
    );
}

export default ListProduct;
