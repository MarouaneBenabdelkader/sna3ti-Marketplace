const initialState = {

};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action.payload };
        case 'LOGOUT':
            return null;
        default:
            return { ...state };
    }
};

export default userReducer;
