export const toggleFavoriteCoin = (favoriteCoins, favoriteCoinToOperate) => {
    let newFavoriteCoins = { ...favoriteCoins }
    if (!newFavoriteCoins[favoriteCoinToOperate.id]) {
        newFavoriteCoins[favoriteCoinToOperate.id] = favoriteCoinToOperate
    }
    else delete newFavoriteCoins[favoriteCoinToOperate.id]
    return newFavoriteCoins
}