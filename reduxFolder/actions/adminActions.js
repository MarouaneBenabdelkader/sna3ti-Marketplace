export const loginAdmin = (admin) => ({
    type: 'LOGIN',
    payload: admin,
});

export const logoutAdmin = () => ({
    type: 'LOGOUT',
});
