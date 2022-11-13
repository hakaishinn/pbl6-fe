import Collections from '/components/collections';

function CollectionPage({ products, title, categories }) {
    return <Collections title={title} products={products} categories={categories}></Collections>;
}

export default CollectionPage;

export async function getServerSideProps(context) {
    const { params } = context;
    const { category } = params; // Use `context.params` to get dynamic params
    const res_products = await fetch(`http://localhost:4000/products`); // Using `restcountries.com` as `restcountries.eu` is no longer accessible
    const data_products = await res_products.json();

    const data = data_products.filter((product) => {
        return product.category_id === parseInt(category);
    });

    const res_category = await fetch(`http://localhost:4000/categories`); // Using `restcountries.com` as `restcountries.eu` is no longer accessible
    const data_categories = await res_category.json();

    const title = data_categories.find(item => {
        return item.id === parseInt(category)
    });

    return { props: { products: data, title : title.category_type, categories: data_categories } };
}
