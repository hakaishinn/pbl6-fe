import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function DefaultLayout({children, categories}) {
    return ( 
        <>
            <Header></Header>
            <Navbar categories={categories}></Navbar>
            {children}
            <Footer></Footer>
        </>
     );
}

export default DefaultLayout;