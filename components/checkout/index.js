import classNames from "classnames/bind";
import Information from "./information";
import Products from "./products";
import styles from "/styles/checkouts/checkouts.module.scss"

const cx = classNames.bind(styles)
function Checkout() {
    return ( <div className="container">
        <div className={cx('wrapper')}>
            <Information className={cx('info')}></Information>
            <Products className={cx('products')}></Products>
        </div>
    </div> );
}

export default Checkout;