import { useEffect } from "react";
import Sidebar from "../../components/admin/sidebar";

function AdminLayout({children, itemActive}) {
    useEffect(() => {
        document.body.style.background = '#f0f2f5';
    })
    return ( 
        <div>
            <Sidebar itemActive={itemActive}></Sidebar>
            {children}
        </div>
     );
}

export default AdminLayout;