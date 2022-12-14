import request from '/utils/request';

export const getLinkVnPay = async (idOrder, loaiHH, price, noiDung, bank, ngonNgu, returnUrl) => {
    try {
        const res = await request.post(
            'vnpay',
            {
                loaiHH,
                price,
                noiDung,
                bank,
                ngonNgu
            },
            {
                params: {
                    id: idOrder,
                    returnUrl: returnUrl
                }
            },
        );
        return res.data
    } catch (error) {
        console.log(error.message);
    }
};