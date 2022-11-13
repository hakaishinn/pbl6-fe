import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from '/styles/collections/product.module.scss';

const cx = classNames.bind(styles);
function Product({ data }) {
    const newPrice = data.price - data.price * data.discount_person
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image')}>
                <Link href={`/products/${data.id}`}>
                    <img src={data.image} alt={data.name}></img>
                </Link>
            </div>
            <div className={cx('text')}>
                <div className={cx('name')}>
                    <Link href={`/products/${data.id}`}>{data.name}</Link>
                </div>
                <div className={cx('price')}>
                    <span>{`${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newPrice)}`}</span>
                    <span>
                        {data.price !== newPrice
                            ? `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}`
                            : ''}
                    </span>
                </div>
                <div className={cx('add-to-cart')}>
                    <button>Thêm vào giỏ</button>
                </div>
            </div>
        </div>
    );
}


export default Product;
