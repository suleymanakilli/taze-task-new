import { FavoriteCoinsActionTypes } from "./favoriteCoinsActionTypes";
export const toggleFavoriteCoin = (favoriteCoinToOperate) => ({
    type: FavoriteCoinsActionTypes.TOGGLE_FAVORITE_COIN,
    payload: favoriteCoinToOperate
});

export const updateFavoriteCoins = favoriteCoins => ({
    type: FavoriteCoinsActionTypes.UPDATE_FAVORITE_COINS,
    payload: favoriteCoins
})

export const getFavoriteCoins = () => ({
    type: FavoriteCoinsActionTypes.GET_FAVORITE_COINS
})
