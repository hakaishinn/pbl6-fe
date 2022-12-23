import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

import styles from '/styles/admin/products.module.scss';
import * as categoriesServices from '/services/categoriesServices';
import * as productsServices from '/services/productsServices';

import AdminLayout from '../../../layout/adminLayout';
import AddProduct from '../formAdd/addProduct';
import UpdateProduct from '../formUpdate/updateProduct';

const cx = classNames.bind(styles);

function Products() {
    const router = useRouter();

    const page = router.query.page;

    const [productItem, setProductItem] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [filter, setFilter] = useState('all');

    const paginateRef = useRef();

    const pageCount = products?.totalPage || 0;

    const handlePageClick = async (event) => {
        console.log('change');
        router.push({
            pathname: `/admin/products`,
            query: { page: event.selected + 1 },
        });
    };

    const handleDelete = async (id) => {
        const res = await productsServices.deleteById(id);
        if (res && res.status === 'Success') {
            getData();
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

    const getData = async () => {
        if (page) {
            if (filter === 'all') {
                const products = await productsServices.getProducts({ page: parseInt(page), size: 9 });
                if (products) {
                    setProducts(products);
                }
            } else {
                const products = await productsServices.getProductByCategoryId(parseInt(filter), {
                    page: parseInt(page),
                    size: 9,
                });
                if (products) {
                    setProducts(products.data);
                }
            }
        } else if (!page) {
            if (filter === 'all') {
                const products = await productsServices.getProducts({ page: 1, size: 9 });
                if (products) {
                    setProducts(products);
                }
            } else {
                const products = await productsServices.getProductByCategoryId(parseInt(filter), {
                    page: 1,
                    size: 9,
                });
                if (products) {
                    setProducts(products.data);
                }
            }
        }
    };
    useEffect(() => {
        getData();
    }, [page, filter]);

    return (
        <AdminLayout itemActive={'products'}>
            {showAdd && (
                <AddProduct
                    filter={filter}
                    setProducts={setProducts}
                    page={page}
                    setShowAdd={setShowAdd}
                    categories={categories}
                ></AddProduct>
            )}
            {showUpdate && (
                <UpdateProduct
                    filter={filter}
                    page={page}
                    products={products}
                    setProducts={setProducts}
                    setShowUpdate={setShowUpdate}
                    categories={categories}
                    productItem={productItem}
                ></UpdateProduct>
            )}
            <div className={cx('wrapper')}>
                <h1>Sản phẩm</h1>
                <div className={cx('header')}>
                    {/* <div className={cx('search')}>
                        <input placeholder="Tìm kiếm..."></input>
                        <button className={cx('btn-search')}>Tìm</button>
                    </div> */}
                    <select onChange={(e) => setFilter(e.target.value)}>
                        <option value={'all'}>Tất cả</option>
                        {categories.map((item) => (
                            <option key={item.id} value={item.id}>{item.categoryType}</option>
                        ))}
                    </select>

                    <button onClick={() => setShowAdd(true)} className={cx('add')}>
                        Thêm
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th width="10%">ID</th>
                            <th width="15%">Thể loại</th>
                            <th width="30%">Tên sản phẩm</th>
                            <th width="15%">Ảnh sản phẩm</th>
                            <th width="10%">Đơn giá</th>
                            <th width="10%">Số lượng</th>
                            <th width="10%">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products?.data?.map((item) => (
                                <tr key={item.idProduct}>
                                    <td>{item.idProduct}</td>
                                    <td>{item.cate}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className={cx('image')}>
                                            <img src={item.image} alt={item.name}></img>
                                        </div>
                                    </td>
                                    <td>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                            item.price - item.price * item.discount,
                                        )}
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setProductItem(item);
                                                setShowUpdate(true);
                                            }}
                                            className={cx('update')}
                                        >
                                            Sửa
                                        </button>
                                        <button onClick={() => handleDelete(item.idProduct)} className={cx('delete')}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {products?.data ? (
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
                ) : undefined}
            </div>
        </AdminLayout>
    );
}

export default Products;
