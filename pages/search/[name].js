import DefaultLayout from '../../layout/defaultLayout';
import Collections from '/components/collections';

function Search() {
    return (
        <DefaultLayout>
            <Collections isSearch={true}></Collections>
        </DefaultLayout>
    );
}

export default Search;
