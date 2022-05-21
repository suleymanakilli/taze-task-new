import axios from "axios";
export default class CoinService {
    getCoinMarketChart(id, days) {
        return axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=0`)
    }
    getCoinDetails(id) {
        return axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=en`)
    }
    getCoinsByPage(pageNumber, coinNumbersPerPage = 100) {
        return axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinNumbersPerPage}&page=${pageNumber}&sparkline=false&price_change_percentage=24h`)
    }
    getAllCoins() {
        return axios.get('https://api.coingecko.com/api/v3/coins/list')
    }
}