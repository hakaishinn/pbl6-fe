import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from '/styles/home/product.module.scss';

const cx = classNames.bind(styles);

function Product({ data }) {
    const newPrice = data.price - data.price * data.discount_person
    return (
        <div className={cx('wrapper')}>
            <div className="title">
                <Link href={`/products/${data.id}`} className={cx('name')}>
                    {data.name}
                </Link>
                <div className={cx('price')}>
                    <p className={cx('new-price')}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newPrice)}</p>
                    <p className={cx('old-price')}>
                        {data.price !== newPrice
                            ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)
                            : ''}
                    </p>
                </div>
            </div>
            <Link className={cx('image')} href={`/products/${data.id}`}>
                <img src={data.image} alt={data.name}></img>
            </Link>
            <button>THÊM VÀO GIỎ</button>
        </div>
    );
}


export default Product;
