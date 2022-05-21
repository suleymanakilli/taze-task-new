import { FavoriteCoinsActionTypes } from "./favoriteCoinsActionTypes"
import { toggleFavoriteCoin } from "./favoriteCoinsUtility"


const INITIAL_STATE = {
    favoriteCoins: {},
}

const favoriteCoinReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FavoriteCoinsActionTypes.GET_FAVORITE_COINS:
            return {
                ...state
            }
        case FavoriteCoinsActionTypes.TOGGLE_FAVORITE_COIN:
            return {
                ...state,
                favoriteCoins: toggleFavoriteCoin(state.favoriteCoins, action.payload)
            }
        case FavoriteCoinsActionTypes.UPDATE_FAVORITE_COINS:
            return {
                ...state,
                favoriteCoins: action.payload
            }
        default:
            return state;
    }
}

export default favoriteCoinReducer