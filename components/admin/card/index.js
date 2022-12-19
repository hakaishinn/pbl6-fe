import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from '/styles/admin/card.module.scss';

const cx = classNames.bind(styles);
function Card({ title, value, growth, footer, icon, color }) {
    return (
        <div className={cx('wrapper')}>
            <div
                className={cx('icon', {
                    pink: color == 'pink',
                    green: color == 'green',
                    blue: color == 'blue',
                })}
            >
                <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
            </div>
            <div className={cx('header')}>
                <span className={cx('title')}>{title}</span>
                <span className={cx('value')}>{value}</span>
            </div>
            <div className={cx('footer')}>
                <span className={cx('growth', { add: growth >= 0, minus: growth < 0 })}>
                    {growth > 0 ? '+' : ''}
                    {growth}%
                </span>{' '}
                so với {footer}
            </div>
        </div>
    );
}

export default Card;
