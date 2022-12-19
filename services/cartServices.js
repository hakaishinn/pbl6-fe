import request from '/utils/request';

export const getCartByUserId = async (userId) => {
    try {
        const res = await request.get(`cart/${userId}`);
        return res.data;
    } catch (error) {
        return [];
    }
};

export const createCartByUserId = async (userId) => {
    try {
        request.post(
            'cart',
            {
                IdUser : userId
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    } catch (error) {
        console.log(error.message);
    }
};

export const addCartItem = async (IdProduct, IdUser, Quantity) => {
    try {
        request.post(
            'cart/cartItem',
            {
                IdProduct: IdProduct,
                IdUser: IdUser,
                Quantity: Quantity,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    } catch (error) {
        console.log(error.message);
    }
};

export const removeCartItemByItem = async (idItem) => {
    try {
        request.delete(`cart/cartItem/${idItem}`);
    } catch (error) {}
};
