import ProductDetail from "../../components/products";

function ProductsPage({product}) {
    return ( <ProductDetail product={product}></ProductDetail> );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params; // Use `context.params` to get dynamic params
    const res_products = await fetch(`http://localhost:4000/products/${id}`); // Using `restcountries.com` as `restcountries.eu` is no longer accessible
    const data_products = await res_products.json();

    return { props: { product: data_products } };
}

export default ProductsPage;