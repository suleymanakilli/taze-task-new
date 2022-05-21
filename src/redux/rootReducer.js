import { combineReducers } from "redux";
import coinReducer from "./coins/coinReducer";
import favoriteCoinReducer from "./favoriteCoins/favoriteCoinsReducer";
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['favoriteCoins'] //Sadece favorite coinsi
}

export const rootReducer = combineReducers({
    coins: coinReducer,
    favoriteCoins: favoriteCoinReducer
})

export default persistReducer(persistConfig, rootReducer)