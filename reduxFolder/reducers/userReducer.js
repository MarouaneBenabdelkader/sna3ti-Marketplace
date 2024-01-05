const initialState = {

};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return null;
    case 'ADD_FOLLOWING':
      return { ...state, following: [...state.following, action.payload] };
    case 'REMOVE_FOLLOWING':
      return {
        ...state,
        following: state.following.filter((following) => following !== action.payload),
      };
    case 'UPDATE_RATEDHANDICRAFTS':
      console.log('action.payload', action.payload);
      let alreadyRatedThisHanidcraft = state.ratedHandicrafts.find(ratedHandicraft => ratedHandicraft.handicraftId === action.payload.handicraftId);
      if (alreadyRatedThisHanidcraft) {
        let updatedRatedHandicrafts = state.ratedHandicrafts.map(ratedHandicraft => {
          if (ratedHandicraft.handicraftId === action.payload.handicraftId) {
            return { handicraftId: ratedHandicraft.handicraftId, rate: action.payload.rate, };
          }
          return ratedHandicraft;
        });
        return { ...state, ratedHandicrafts: updatedRatedHandicrafts };
      }
      return { ...state, ratedHandicrafts: [...state.ratedHandicrafts, action.payload] };

    case 'UPDATE_RATEDITEMS':
      let alreadyRatedThisItem = state.ratedItems.find(ratedItem => ratedItem.itemId === action.payload.itemId);
      if (alreadyRatedThisItem) {
        let updatedRatedItems = state.ratedItems.map(ratedItem => {
          if (ratedItem.itemId === action.payload.itemId) {
            return { itemId: ratedItem.itemId, rate: action.payload.rate, };
          }
          return ratedItem;
        });
        return { ...state, ratedItems: updatedRatedItems };
      }
      return { ...state, ratedItems: [...state.ratedItems, action.payload] };

    case 'ADD_ITEM_TO_SAVEDITEMS':
      return { ...state, savedItems: [...state.savedItems, action.payload] };
    case 'REMOVE_ITEM_FROM_SAVEDITEMS':
      return {
        ...state,
        savedItems: state.savedItems.filter((item) => item !== action.payload),
      };
    default:
      return { ...state };
  }
};

export default userReducer;
