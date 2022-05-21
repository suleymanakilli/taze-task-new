import { CoinActionTypes } from './coinActionTypes';
import axios from 'axios';
import CoinService from '../../services/coinService';
export const fetchCoinsStart = () => ({
    type: CoinActionTypes.FETCH_COINS_START,
});

export const fetchCoinsSuccess = (coinList) => ({
    type: CoinActionTypes.FETCH_COINS_SUCCESSS,
    payload: coinList
})

export const fetchCoinsFailure = (errorMessage) => ({
    type: CoinActionTypes.FETCH_COINS_FAILURE,
    payload: errorMessage
})
//`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`

//`https://api.coingecko.com/api/v3/coins/list`
export const fetchCoinsStartAsync = (page, coinNumbersPerPage = 250) => {
    return dispatch => {
        dispatch(fetchCoinsStart())
        let coinService = new CoinService()
        coinService.getCoinsByPage(page, coinNumbersPerPage).then(result => {
            dispatch(fetchCoinsSuccess(result.data))
        })
            .catch(err => dispatch(fetchCoinsFailure(err.response)))
    }
}