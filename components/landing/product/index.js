import classNames from 'classnames/bind';

import styles from '/styles/landing/product.module.scss';

const cx = classNames.bind(styles);

function Product({ size = '', src }) {
    var classes = [];
    if (size !== '') {
        classes.push(size);
    }
    return (
        <div className={cx('wrapper', classes)}>
            <img src={src} alt="img-product"></img>
            <div className={cx('price')}>
                <span className={cx('price-new')}>19,800đ</span>
                <span className={cx('price-old')}>22,000đ</span>
            </div>
            <button>Mua ngay</button>
        </div>
    );
}

export default Product;
