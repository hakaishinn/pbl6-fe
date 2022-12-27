import classNames from 'classnames/bind';
import styles from '/styles/admin/products.module.scss';
import ReactPaginate from 'react-paginate';

import AdminLayout from '../../../layout/adminLayout';
import * as authServices from '/services/authServices';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

function Users() {
    const [users, setUsers] = useState(null);

    const router = useRouter();

    const page = router.query.page;

    const pageCount = users?.totalPage || 0;

    const handlePageClick = async (event) => {
        router.push({
            pathname: `/admin/users`,
            query: { page: event.selected + 1 },
        });
    };

    useEffect(() => {
        const getData = async () => {
            if (page) {
                const users = await authServices.getAll({ page: parseInt(page), size: 9 });
                if (users && users.data) {
                    setUsers(users);
                }
            } else {
                const users = await authServices.getAll({ page: 1, size: 9 });
                if (users && users.data) {
                    setUsers(users);
                }
            }
        };
        getData();
    }, [page]);
    return (
        <AdminLayout itemActive={'users'}>
            <div className={cx('wrapper')}>
                <h1>Người dùng</h1>
                <div className={cx('header')}></div>
                <table>
                    <thead>
                        <tr>
                            <th width={'5%'}>ID</th>
                            <th width={'15%'}>Tên đăng nhập</th>
                            <th width={'15%'}>Tên hiển thị</th>
                            <th width={'15%'}>Email</th>
                            <th width={'30%'}>Địa chỉ</th>
                            <th width={'15%'}>Liên hệ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users?.data.length > 0 &&
                            users.data.map((item) => (
                                <tr key={item.idUser}>
                                    <td>{item.idUser}</td>
                                    <td>{item.username}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.contact}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {users && users?.data.length > 0 ? (
                    <ReactPaginate
                        forcePage={page ? page - 1 : 0}
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        containerClassName={cx('pagination')}
                        pageLinkClassName={cx('page-num')}
                        previousLinkClassName={cx('page-num')}
                        nextLinkClassName={cx('page-num')}
                        activeLinkClassName={cx('active')}
                    />
                ) : undefined}
            </div>
        </AdminLayout>
    );
}

export default Users;
