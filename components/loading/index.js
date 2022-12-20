import classNames from 'classnames/bind';
import styles from '/styles/loading.module.scss';

const cx = classNames.bind(styles);

export function Loading({ isOverlay = false }) {
    const classes = cx('overlay-loading');
    return (
        <div className={isOverlay ? classes : ''}>
            <img src="/images/loading.gif"></img>
        </div>
    );
}

export function LoadingSkeleton({className}) {
    const classes = cx('skeleton', className)
    return ( <div className={classes}></div> );
}



