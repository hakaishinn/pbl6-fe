import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from '/styles/iconContact.module.scss';

const cx = classNames.bind(styles);

function IconContact() {
    const [showScroll, setShowScroll] = useState(false);

    const handleScrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        });
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('message', 'phone')}>
                <a href="tel:0385078386">
                    <img className={cx('image')} src="/images/icon_phone.png"></img>
                </a>
            </div>
            <div className={cx('message')}>
                <a href="https://www.facebook.com/synguyen1808" target={'_blank'}>
                    <img className={cx('image')} src="/images/iconMessage.png"></img>
                </a>
            </div>
            <div className={cx('message', 'zalo')}>
                <a href="https://zalo.me/0777520765" target={'_blank'}>
                    <img className={cx('image')} src="/images/zaloChatItem.png"></img>
                </a>
            </div>
            {showScroll && (
                <button className={cx('scrollToTop')} onClick={handleScrollUp}>
                    <FontAwesomeIcon icon={faArrowUpLong}></FontAwesomeIcon>
                </button>
            )}
        </div>
    );
}

export default IconContact;
