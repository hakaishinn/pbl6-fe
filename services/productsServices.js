import request from '/utils/request';

export const getProducts = async (params = {}) => {
    try {
        const res = await request.get('products', { params });
        return res.data;
    } catch (error) {
        console.log('Loi: ',error.message);
        return [];
    }
};

export const getProductsNew = async (params = {}) => {
    try {
        const res = await request.get('products/orderby', { params });
        return res.data;
    } catch (error) {
        console.log('Loi: ',error.message);
        return [];
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