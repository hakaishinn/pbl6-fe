import AdminLayout from '../../layout/adminLayout';
import Dashboard from './dashboard';

function Admin() {
    return (
        <div>
            <AdminLayout>
                <Dashboard></Dashboard>
            </AdminLayout>
        </div>
    );
}

export default Admin;
