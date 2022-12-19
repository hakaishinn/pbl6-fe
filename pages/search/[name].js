import Collections from '/components/collections';
import * as productsServices from '/services/productsServices';
import * as categoriesServices from '/services/categoriesServices';

function Search() {
    return <Collections isSearch={true}></Collections>;
}

export default Search;
