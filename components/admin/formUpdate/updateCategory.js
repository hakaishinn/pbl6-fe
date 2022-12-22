import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from '/styles/admin/formUpdate/category.module.scss';
import * as categoriesServices from '/services/categoriesServices';

const cx = classNames.bind(styles);
function UpdateCategory({ category, setShowUpdate, setCategories }) {
    const [name, setName] = useState(category.categoryType);
    const handleUpdate = async () => {
        const res = await categoriesServices.update(category.id, name);
        if (res && res.status === 'Success') {
            const data_categories = await categoriesServices.getCategories();
            if (data_categories && data_categories.length > 0) {
                setCategories(data_categories);
            }
            setShowUpdate(false)
        }
    };
    return (
        <div className={cx('overlay')}>
            {category && (
                <div className={cx('wrapper')}>
                    <h2>Cập nhật thể loại truyện</h2>

                    <div className={cx('form-input')}>
                        <label htmlFor="idCategory">ID</label>
                        <input id={'idCategory'} placeholder="ID" value={category.id} disabled></input>
                    </div>

                    <div className={cx('form-input')}>
                        <label htmlFor="name">Tên truyện</label>
                        <input
                            id={'name'}
                            placeholder="Tên thể loại"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>

                    <button onClick={handleUpdate}>Lưu</button>
                    <button onClick={() => setShowUpdate(false)}>Đóng</button>
                </div>
            )}
        </div>
    );
}

export default UpdateCategory;
