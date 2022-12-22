import request from '/utils/request';

export const login = async (username, password) => {
    try {
        const res = await request.post(
            'auth/login',
            {
                Username: username,
                Password: password,
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

export const register = async (registerUser) => {
    try {
        const res = await request.post('auth/register', {
            username: registerUser.username,
            password: registerUser.password,
            name: registerUser.name,
            email: registerUser.email,
        });
        return res.data;
    } catch (error) {}
};

export const getUserByUsername = async (username) => {
    try {
        const res = await request.get(`auth/${username}`);
        return res.data;
    } catch (error) {
        return undefined;
    }
};

export const getAll = async () => {
    try {
        const res = await request.get(`auth/`);
        return res.data;
    } catch (error) {
        return undefined;
    }
};

export const updateUserById = async (user) => {
    try {
        const res = await request.put(`auth/${user.idUser}`, {
            name: user.name,
            address: user.address,
            contact: user.contact,
            email: user.email,
        });
        return res.data;
    } catch (error) {}
};
