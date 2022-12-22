import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from '/styles/admin/formUpdate/category.module.scss';
import * as categoriesServices from '/services/categoriesServices';

const cx = classNames.bind(styles);
function AddCategory({ setShowAdd, setCategories }) {
    const [name, setName] = useState('')
    const handleAdd = async() => {
        const res = await categoriesServices.add(name);
        if (res && res.status === 'Success') {
            const data_categories = await categoriesServices.getCategories();
            if (data_categories && data_categories.length > 0) {
                setCategories(data_categories);
            }
            setShowAdd(false)
        }
    }
    return (
        <div className={cx('overlay')}>
            (
                <div className={cx('wrapper')}>
                    <h2>Thêm thể loại truyện</h2>

                    <div className={cx('form-input')}>
                        <label htmlFor="name">Tên truyện</label>
                        <input id={'name'} placeholder="Tên thể loại" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    <button onClick={handleAdd}>Lưu</button>
                    <button onClick={() => setShowAdd(false)}>Đóng</button>
                </div>
            )
        </div>
    );
}

export default AddCategory;
