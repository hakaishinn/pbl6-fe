import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import styles from '/styles/admin/formUpdate/category.module.scss';

import * as productsServices from '/services/productsServices';

const cx = classNames.bind(styles);

function AddProduct({ setShowAdd, categories, setProducts, page, filter }) {
    const inputRef = useRef();
    const imageRef = useRef();
    const [product, setProduct] = useState({
        name: '',
        image: '',
        desc: '',
        price: 0,
        quantity: 0,
        discount: 0,
        idCate: 1,
    });


    const handleAdd = async () => {
        const res = await productsServices.addProduct(product);
        if (res && res.status === 'Success') {
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
            setShowAdd(false);
        }
    };
    return (
        <div className={cx('overlay')} onClick={() => setShowAdd(false)}>
            (
            <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
                <h2>Thêm Truyện</h2>

                <span className={cx('icon-close')} onClick={() => setShowAdd(false)}>&#x2716;</span>

                <div className={cx('form-input')}>
                    <label htmlFor="name">Tên truyện</label>
                    <input
                        id={'name'}
                        placeholder="Tên truyện"
                        value={product.name}
                        onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
                    ></input>
                </div>

                <input
                    className={cx('inputUploadAdd')}
                    id='inputUploadAdd'
                    ref={inputRef}
                    type={'file'}
                    onChange={(e) =>
                        {
                            imageRef.current.src = `/imageProduct/${e.target.files[0].name}`
                            setProduct((prev) => ({ ...prev, image: `/imageProduct/${e.target.files[0].name}` }))
                        }
                    }
                ></input>
                <label className={cx('lb-upload')} htmlFor='inputUploadAdd'>Chọn hình ảnh</label>
                <br></br>

                <div className={cx('image-preview')}><img ref={imageRef}></img></div>

                <div className={cx('form-input')}>
                    <label htmlFor="desc">Mô tả</label>
                    <textarea
                        id={'desc'}
                        placeholder="Mô tả"
                        value={product.desc}
                        onChange={(e) => setProduct((prev) => ({ ...prev, desc: e.target.value }))}
                    ></textarea>
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
                    <select onChange={(e) => setProduct((prev) => ({ ...prev, idCate: e.target.value }))}>
                        {categories.map((item) => (
                            <option key={item.id} name={'idCate'} value={item.id}>
                                {item.categoryType}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={handleAdd}>Thêm</button>
                <button className={cx('btn-close')} onClick={() => setShowAdd(false)}>Đóng</button>
            </div>
            )
        </div>
    );
}

export default AddProduct;
