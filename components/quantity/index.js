import classNames from "classnames/bind";
import { useState } from "react";
import styles from '/styles/quantity.module.scss'

const cx = classNames.bind(styles)
function Quantity() {
    const [quantity, setQuantity] = useState(1)

    const handleAdd = () => {
        setQuantity(prev => prev + 1)
    }
    const handleMinus = () => {
        if (quantity <= 1) return;
        setQuantity(prev => prev - 1)
    }
    return (
        <div className={cx('quantity-btn')}>
            <button onClick={handleMinus}>-</button>
            <input value={quantity} onChange={(e) => {
                const value = e.target.value;
                (!isNaN(+value) || '') && setQuantity(+value)
            }}></input>
            <button onClick={handleAdd}>+</button>
        </div>
    );
}

export default Quantity;
