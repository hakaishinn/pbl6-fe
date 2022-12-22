import request from '/utils/request'

export const getCategories = async (params = {}) => {
    try {
        const res = await request.get('products/categories', {params})
        return res.data
    } catch (error) {
        return []
    }
}

export const update = async(id, categoryType) => {
    try {
        const res = await request.put(`products/category/${id}`, {
            categoryType: categoryType
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export const add = async(categoryType) => {
    try {
        const res = await request.post(`products/category`, {
            categoryType: categoryType
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}


