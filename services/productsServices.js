import request from '/utils/request';

export const getProducts = async (params = {}) => {
    try {
        const res = await request.get('products', { params });
        return res.data;
    } catch (error) {
        console.log('Loi: ',error.message);
    }
};

export const getProductsNew = async (params = {}) => {
    try {
        const res = await request.get('products/orderby', { params });
        return res.data;
    } catch (error) {
        console.log('Loi: ',error.message);
    }
};

export const getProductById = async (id) => {
    try {
        const res = await request.get(`products/${id}`);
        return res.data;
    } catch (error) {
        return [];
    }
};

export const getProductByCategoryId = async (id, params={}) => {
    try {
        const res = await request.get(`products/category/${id}`,{params});
        return res.data;
    } catch (error) {
        return [];
    }
};

export const sortProductByPrice = async (idCategory, params={}) => {
    try {
        const res = await request.get(`products/orderby/Price/${idCategory}`,{params});
        return res.data;
    } catch (error) {
        return [];
    }
};

export const remove = async (id) => {
    try {
        request.delete(`products/${id}`);
    } catch (error) {}
};

export const search = async (name, params={}) => {
    try {
        const res = await request.get(`products/${name}`, {params});
        return res.data;
    } catch (error) {
        return [];
    }
};

export const addProduct = async (product) => {
    try {
        const res = await request.post(
            'products',
            {
                Name: product.name,
                Image: product.image,
                Desc: product.desc,
                Price: parseInt(product.price),
                Quantity: parseInt(product.quantity),
                Discount: parseFloat(product.discount),
                IdCate: parseInt(product.idCate)
            },
        );
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const updateProduct = async (idProduct, product) => {
    try {
        const res = await request.put(
            `products/${idProduct}`,
            {
                Name: product.name,
                Image: product.image,
                Desc: product.desc,
                Price: parseInt(product.price),
                Quantity: parseInt(product.quantity),
                Discount: parseFloat(product.discount),
                IdCate: parseInt(product.idCate)
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteById = async (id) => {
    try {
        const res = await request.delete(`products/${id}`);
        return res.data;
    } catch (error) {
        console.log(error.message);;
    }
};