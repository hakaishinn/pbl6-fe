import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { SearchIcon } from '../../Icons';
import styles from '/styles/header/search.module.scss';

const cx = classNames.bind(styles);
function Search() {
    const router = useRouter()
    const [value, setValue] = useState('');
    const handleSearch = () => {
        router.push(`/search/${value}`)
    }
    return (
        <div className={cx('search')}>
            <input
                value={value}
                className={'input-search'}
                placeholder="Tìm kiếm sản phẩm mong muốn..."
                name="search"
                onChange={(e) => setValue(e.target.value)}
            ></input>
            <button className={cx('btn-search')} onClick={handleSearch}>
                <SearchIcon className={cx('search-icon')}></SearchIcon>
            </button>
        </div>
    );
}

export default Search;
