import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';

import styles from '/styles/quantity.module.scss';
import * as cartServices from '/services/cartServices';
import { AppContext } from '/context/appProvider.js';

const cx = classNames.bind(styles);

function Quantity({ parentCallback, value = 1, isCart = false, product = {} }) {
    const { user } = useContext(AppContext);

    const [quantity, setQuantity] = useState(value);
    const handleAdd = () => {
        if (isCart) {
            if (product.product.quantity > quantity) {
                setQuantity((prev) => prev + 1);
            } else {
                alert(`Shop chỉ còn ${product.product.quantity} quyển!`);
            }
        } else {
            if (product.quantity > quantity) {
                setQuantity((prev) => prev + 1);
            } else {
                alert(`Shop chỉ còn ${product.quantity} quyển!`);
            }
        }
    };
    const handleMinus = () => {
        if (quantity <= 1) return;
        setQuantity((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (isCart) {
            if (product.product.quantity >= +value) {
                (!isNaN(+value) || '') && setQuantity(+value);
            } else {
                alert(`Shop chỉ còn ${product.product.quantity} quyển!`);
            }
        } else {
            if (product.quantity >= +value) {
                (!isNaN(+value) || '') && setQuantity(+value);
            } else {
                alert(`Shop chỉ còn ${product.quantity} quyển!`);
            }
        }
    };

    const sendData = async (quantity) => {
        if (isCart) {
            // await CallApi(`cart/${product.id}`, 'PUT', {
            //     ...product,
            //     quantity_product: quantity,
            // });
            // await cartServices.updateCartItem(product.idProduct, user.idUser, quantity)
            parentCallback({quantity, idItemCart : product.id});
        } else {
            parentCallback(quantity);
        }
    };

    useEffect(() => {
        sendData(quantity);
    }, [quantity]);

    return (
        <div className={cx('quantity-btn')}>
            <button onClick={handleMinus}>-</button>
            <input value={quantity} onChange={handleChange}></input>
            <button onClick={handleAdd}>+</button>
        </div>
    );
}

export default Quantity;
