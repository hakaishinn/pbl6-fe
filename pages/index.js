import Home from '../components/home';
import * as productsServices from '/services/productsServices';

function HomePage() {
    return <Home></Home>;
}

// export async function getServerSideProps() {
//     const productsFull = await productsServices.getProductByCategoryId(5 ,{ page: 1, size: 12 });
//     const productsNew = await productsServices.getProductsNew({ size: 12 });

//     const gift = await productsServices.getProductByCategoryId(6 ,{ page: 1, size: 12 });

//     return { props: { productsFull: productsFull.data.data, gifts: gift.data.data, productsNew: productsNew }};
// }
export default HomePage;
