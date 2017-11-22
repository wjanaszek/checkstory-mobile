export const login = (login, password) => {
    return {
        type: 'LOGIN_USER',
        login,
        password
    }
};

