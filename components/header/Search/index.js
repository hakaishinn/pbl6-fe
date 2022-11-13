import classNames from 'classnames/bind';
import { SearchIcon } from '../../Icons';
import styles from '/styles/header/search.module.scss';

const cx = classNames.bind(styles);
function Search() {
    return (
        <div className={cx('search')}>
            <input className={'input-search'} placeholder="Tìm kiếm sản phẩm mong muốn..." name="search"></input>
            <button className={cx('btn-search')}>
                <SearchIcon className={cx('search-icon')}></SearchIcon>
            </button>
        </div>
    );
}

export default Search;
