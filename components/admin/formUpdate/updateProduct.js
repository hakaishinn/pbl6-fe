import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from '/styles/admin/formUpdate/category.module.scss';

import * as productsServices from '/services/productsServices';

const cx = classNames.bind(styles);

function UpdateProduct({ setShowUpdate, categories, productItem, products, setProducts, page, filter }) {
    const [product, setProduct] = useState({
        name: productItem.name,
        image: productItem.image,
        desc: productItem.desc,
        price: productItem.price,
        quantity: productItem.quantity,
        discount: productItem.discount,
        cate: productItem.cate,
        idCate: categories.find((item) => item.categoryType === productItem.cate).id,
    });

    console.log('update', page);

    const handleUpdate = async () => {
        const resUpdate = await productsServices.updateProduct(parseInt(productItem.idProduct), product);
        if (resUpdate && resUpdate.status === 'Success') {
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
            setShowUpdate(false);
        }
    };
    return (
        <div className={cx('overlay')}>
            (
            <div className={cx('wrapper')}>
                <h2>Cập nhật truyện</h2>

                <div className={cx('form-input')}>
                    <label htmlFor="name">Tên truyện</label>
                    <input
                        id={'name'}
                        placeholder="Tên thể loại"
                        value={product.name}
                        onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
                    ></input>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="image">URL hình ảnh</label>
                    <input
                        id={'image'}
                        placeholder="URL hình ảnh"
                        value={product.image}
                        onChange={(e) => setProduct((prev) => ({ ...prev, image: e.target.value }))}
                    ></input>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="desc">Mô tả</label>
                    <input
                        id={'desc'}
                        placeholder="Mô tả"
                        value={product.desc}
                        onChange={(e) => setProduct((prev) => ({ ...prev, desc: e.target.value }))}
                    ></input>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="price">Đơn giá</label>
                    <input
                        id={'price'}
                        placeholder="Đơn giá"
                        value={product.price}
                        onChange={(e) => setProduct((prev) => ({ ...prev, price: e.target.value }))}
                    ></input>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="quantity">Số lượng</label>
                    <input
                        id={'quantity'}
                        placeholder="Số lượng"
                        value={product.quantity}
                        onChange={(e) => setProduct((prev) => ({ ...prev, quantity: e.target.value }))}
                    ></input>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="discount">Giảm giá</label>
                    <input
                        id={'discount'}
                        placeholder="Giảm giá"
                        value={product.discount}
                        onChange={(e) => setProduct((prev) => ({ ...prev, discount: e.target.value }))}
                    ></input>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="idCate">Thể loại</label>
                    <select
                        value={product.idCate}
                        onChange={(e) => setProduct((prev) => ({ ...prev, idCate: parseInt(e.target.value) }))}
                    >
                        {categories.map((item) => (
                            <option key={item.id} name={'idCate'} value={item.id}>
                                {item.categoryType}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={handleUpdate}>Cập nhật</button>
                <button onClick={() => setShowUpdate(false)}>Đóng</button>
            </div>
            )
        </div>
    );
}

export default UpdateProduct;
