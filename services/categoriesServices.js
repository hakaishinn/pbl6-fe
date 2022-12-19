import request from '/utils/request'

export const getCategories = async (params = {}) => {
    try {
        const res = await request.get('products/categories', {params})
        return res.data
    } catch (error) {
        return []
    }
}

export const remove = async(id) => {
    try {
        request.delete(`product/category/${id}`)
    } catch (error) {
        console.log(error);
    }
}

