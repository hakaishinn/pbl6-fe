import classNames from 'classnames/bind';
import styles from '/styles/admin/products.module.scss';

import AdminLayout from '../../../layout/adminLayout';
import * as authServices from '/services/authServices';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const users = await authServices.getAll();
            if (users && users.data) {
                setUsers(users.data);
            }
        };
        getData();
        console.log(users);
    }, []);
    return (
        <AdminLayout itemActive={'users'}>
            <div className={cx('wrapper')}>
                <h1>Người dùng</h1>
                <div className={cx('header')}>
                    {/* <div className={cx('search')}>
                        <input placeholder="Tìm kiếm..."></input>
                        <button className={cx('btn-search')}>Tìm</button>
                    </div> */}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th width={'5%'}>ID</th>
                            <th width={'15%'}>Tên đăng nhập</th>
                            <th width={'15%'}>Tên hiển thị</th>
                            <th width={'15%'}>Email</th>
                            <th width={'30%'}>Địa chỉ</th>
                            <th width={'15%'}>Liên hệ</th>
                            {/* <th width={'5%'}>Thao tác</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 &&
                            users.map((item) => (
                                <tr key={item.idUser}>
                                    <td>{item.idUser}</td>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.contact}</td>
                                    {/* <td>
                                        <button className={cx('delete')}>Xóa</button>
                                    </td> */}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

export default Users;
