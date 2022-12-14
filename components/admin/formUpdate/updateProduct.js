import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import styles from '/styles/admin/formUpdate/category.module.scss';

import * as productsServices from '/services/productsServices';

const cx = classNames.bind(styles);

function UpdateProduct({ setShowUpdate, categories, productItem, products, setProducts, page, filter }) {
    const inputRef = useRef();
    const imageRef = useRef();
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

    const handleUpdate = async () => {
        if (product.price > 0 && product.quantity > 0 && product.discount >= 0) {
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
            } else {
                alert('Vui l??ng ki???m tra l???i th??ng tin');
            }
        } else {
            alert('Vui l??ng ki???m tra l???i th??ng tin');
        }
    };
    return (
        <div className={cx('overlay')} onClick={() => setShowUpdate(false)}>
            <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
                <h2>C???p nh???t truy???n</h2>
                <span className={cx('icon-close')} onClick={() => setShowUpdate(false)}>
                    &#x2716;
                </span>

                <div className={cx('form-input')}>
                    <label htmlFor="name">T??n truy???n</label>
                    <input
                        id={'name'}
                        placeholder="T??n truy???n"
                        value={product.name}
                        onChange={(e) => setProduct((prev) => ({ ...prev, name: e.target.value }))}
                    ></input>
                </div>

                <input
                    className={cx('inputUploadAdd')}
                    id="inputUploadUpdate"
                    ref={inputRef}
                    type={'file'}
                    onChange={(e) => {
                        imageRef.current.src = `/imageProduct/${e.target.files[0].name}`;
                        setProduct((prev) => ({ ...prev, image: `/imageProduct/${e.target.files[0].name}` }));
                    }}
                ></input>
                <label className={cx('lb-upload')} htmlFor="inputUploadUpdate">
                    Ch???n h??nh ???nh
                </label>
                <br></br>

                <div className={cx('image-preview')}>
                    <img ref={imageRef} src={product.image}></img>
                </div>

                <div className={cx('form-input')}>
                    <label htmlFor="desc">M?? t???</label>
                    <textarea
                        id={'desc'}
                        placeholder="M?? t???"
                        value={product.desc}
                        onChange={(e) => setProduct((prev) => ({ ...prev, desc: e.target.value }))}
                    ></textarea>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="price">????n gi?? (VND)</label>
                    <input
                        id={'price'}
                        placeholder="????n gi??"
                        value={product.price}
                        onChange={(e) => setProduct((prev) => ({ ...prev, price: e.target.value }))}
                    ></input>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="quantity">S??? l?????ng</label>
                    <input
                        id={'quantity'}
                        placeholder="S??? l?????ng"
                        value={product.quantity}
                        onChange={(e) => setProduct((prev) => ({ ...prev, quantity: e.target.value }))}
                    ></input>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="discount">Gi???m gi??</label>
                    <input
                        id={'discount'}
                        placeholder="Gi???m gi??"
                        value={product.discount}
                        onChange={(e) => setProduct((prev) => ({ ...prev, discount: e.target.value }))}
                    ></input>
                </div>
                <div className={cx('form-input')}>
                    <label htmlFor="idCate">Th??? lo???i</label>
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

                <button onClick={handleUpdate}>C???p nh???t</button>
                <button className={cx('btn-close')} onClick={() => setShowUpdate(false)}>
                    ????ng
                </button>
            </div>
        </div>
    );
}

export default UpdateProduct;
