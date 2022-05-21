import { CoinActionTypes } from "./coinActionTypes"


const INITIAL_STATE = {
    coins: null,
    isFetching: false,
    errorMessage: undefined
}

const coinReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CoinActionTypes.FETCH_COINS_START:
            return {
                ...state,
                isFetching: true
            }
        case CoinActionTypes.FETCH_COINS_SUCCESSS:
            return {
                ...state,
                isFetching: false,
                coins: action.payload
            }
        case CoinActionTypes.FETCH_COINS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default coinReducer