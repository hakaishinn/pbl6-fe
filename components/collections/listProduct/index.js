import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from '/styles/collections/listProduct.module.scss'
import Product from '../product';

const cx = classNames.bind(styles)

function ListProduct({ data }) {
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className={cx('list-product')}>
                {currentItems.map(product => (
                    <Product key={product.id} data={product}></Product>
                ))}
            </div>
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
                nextLinkClassName = {cx('page-num')}
                activeLinkClassName={cx('active')}
            />
        </>
    );
}

export default ListProduct;
