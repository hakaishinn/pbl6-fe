import classNames from 'classnames/bind';
import styles from '/styles/admin/products.module.scss';

import AdminLayout from '../../../layout/adminLayout';
import { useState, useEffect } from 'react';
import * as categoriesServices from '/services/categoriesServices';
import UpdateCategory from '../formUpdate/updateCategory';
import AddCategory from '../formAdd/addCategory';

const cx = classNames.bind(styles);

function Category() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const updateCategory = (category) => {
        setCategory(category);
        setShowUpdate(true);
    };

    useEffect(() => {
        const getData = async () => {
            if (categories.length <= 0) {
                const data_categories = await categoriesServices.getCategories();
                if (data_categories.length > 0) {
                    setCategories(data_categories);
                }
            }
        };

        getData();
    }, []);
    return (
        <AdminLayout itemActive={'category'}>
            <div className={cx('wrapper')}>
                <h1>Thể loại</h1>
                <div className={cx('header')}>
                    {/* <div className={cx('search')}>
                        <input placeholder="Tìm kiếm..."></input>
                        <button className={cx('btn-search')}>Tìm</button>
                    </div> */}

                    <button onClick={() => setShowAdd(true)} className={cx('add')}>
                        Thêm
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên thể loại</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 &&
                            categories.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.categoryType}</td>
                                    <td>
                                        <button onClick={() => updateCategory(item)} className={cx('update')}>
                                            Sửa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {showUpdate && (
                <UpdateCategory
                    setCategories={setCategories}
                    category={category}
                    setShowUpdate={setShowUpdate}
                ></UpdateCategory>
            )}
            {showAdd && <AddCategory setCategories={setCategories} setShowAdd={setShowAdd}></AddCategory>}
        </AdminLayout>
    );
}

export default Category;
