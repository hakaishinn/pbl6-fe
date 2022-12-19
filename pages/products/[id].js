import ProductDetail from '../../components/products';
import * as productsServices from "/services/productsServices";


function ProductsPage() {
    return <ProductDetail></ProductDetail>;
}

// export async function getServerSideProps(context) {
//     const { params } = context;
//     const { id } = params;

//     const data_products = await productsServices.getProductById(id);

//     return { props: { product: data_products } };
// }

export default ProductsPage;
