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
        } else {
            alert('Vui l??ng ki???m tra l???i th??ng tin')
        }
    };
    return (
        <div className={cx('overlay')} onClick={() => setShowAdd(false)}>
            (
            <div className={cx('wrapper')} onClick={(e) => e.stopPropagation()}>
                <h2>Th??m Truy???n</h2>

                <span className={cx('icon-close')} onClick={() => setShowAdd(false)}>&#x2716;</span>

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
                <label className={cx('lb-upload')} htmlFor='inputUploadAdd'>Ch???n h??nh ???nh</label>
                <br></br>

                <div className={cx('image-preview')}><img ref={imageRef}></img></div>

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
                    <label htmlFor="price">????n gi??</label>
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
                    <select onChange={(e) => setProduct((prev) => ({ ...prev, idCate: e.target.value }))}>
                        {categories.map((item) => (
                            <option key={item.id} name={'idCate'} value={item.id}>
                                {item.categoryType}
                            </option>
                        ))}
                    </select>
                </div>

                <button onClick={handleAdd}>Th??m</button>
                <button className={cx('btn-close')} onClick={() => setShowAdd(false)}>????ng</button>
            </div>
            )
        </div>
    );
}

export default AddProduct;
