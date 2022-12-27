import request from '/utils/request';

export const getOrders = async (params = {}) => {
    try {
        const res = await request.get('order/status', { params });
        return res.data;
    } catch (error) {
        console.log('Loi: ', error.message);
    }
};

export const getOrdersByIdUser = async (idUser ,params = {page: 1, size: 100}) => {
    try {
        const res = await request.get(`order/${idUser}`, { params });
        return res.data;
    } catch (error) {
        console.log('Loi: ', error.message);
    }
};

export const getOrderById = async (idOrder) => {
    try {
        const res = await request.get(`order/Find/${idOrder}`);
        return res.data;
    } catch (error) {
        console.log('Loi: ', error.message);
    }
};

export const updateStatusOrder = async (id, status) => {
    try {
        const res = await request.put(
            `order/${id}`,
            {},
            {
                params: {
                    status: status,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const updateStatusOrderVnPay = async (idOrder, vnpayResponseCode) => {
    try {
        const res = await request.put(
            `order/vnpay/${idOrder}`,
            {},
            {
                params: {
                    vnpay: vnpayResponseCode,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const createOrders = async (idUser, address, phone) => {
    try {
        const res = await request.post(
            'order',
            {
                IdUser: idUser,
                address: address,
                sdt: phone,
            },
        );
        return res.data;
    } catch (error) {
        console.log('Loi: ', error.message);
    }
};


export const getStatistical = async (year, params={}) => {
    try {
        const res = await request.get(`order/income/${year}`, {params});
        return res.data;
    } catch (error) {
        console.log('Loi: ', error.message);
    }
};
