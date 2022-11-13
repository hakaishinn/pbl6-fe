import Home from "../components/home";

function HomePage({products}) {
    return ( <Home products={products}></Home> );
}

export async function getServerSideProps() {
    const res_products = await fetch(`http://localhost:4000/products`); // Using `restcountries.com` as `restcountries.eu` is no longer accessible
    const data_products = await res_products.json();

    return { props: { products: data_products } };
}
export default HomePage;