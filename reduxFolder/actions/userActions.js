export const loginUser = (user) => ({
    type: 'LOGIN',
    payload: user,
});

export const logoutUser = () => ({
    type: 'LOGOUT',
});
export const addFollowing = (following) => ({
    type: 'ADD_FOLLOWING',
    payload: following,
});
export const removeFollowing = (following) => ({
    type: 'REMOVE_FOLLOWING',
    payload: following,
});
export const updateRatedHandicrafts = (data) => ({
    type: 'UPDATE_RATEDHANDICRAFTS',
    payload: data,
});
export const updateRatedItems = (data) => ({
    type: 'UPDATE_RATEDITEMS',
    payload: data
})
export const addItemToSavedItems = (item) => ({
    type: 'ADD_ITEM_TO_SAVEDITEMS',
    payload: item
})
export const removeItemFromSavedItems = (item) => ({
    type: 'REMOVE_ITEM_FROM_SAVEDITEMS',
    payload: item
})
