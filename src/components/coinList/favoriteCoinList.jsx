import React, { useEffect, useState } from 'react'
import './coinList.css'
import FavoriteIcon from '../../assets/favoriteIcon'
import CoinService from '../../services/coinService'
import { useSelector } from 'react-redux';
import LineChart from '../lineChart/lineChart'
import { Link, useNavigate } from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const chartOptions = {
    responsive: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
        tooltip: {
            enabled: false
        },
    },
    elements: {
        point: {
            radius: 0
        }
    },
    scales: {
        x: {
            ticks: {
                display: false,
            },
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                display: false
            },
            grid: {
                display: false,
            },
        }
    }
}

function FavoriteCoinList({ handleToggleFavorite }) {
    const favoriteCoins = useSelector(state => state.favoriteCoins.favoriteCoins)
    const [coins, setCoins] = useState(Object.values(favoriteCoins))
    const navigate = useNavigate()
    useEffect(() => {
        if (favoriteCoins) {
            let promises = [];
            let priceLabel = []
            let prices = []
            let favoriteCoinsKeys = Object.keys(favoriteCoins)
            let coinService = new CoinService()

            for (let i = 0; i < favoriteCoinsKeys.length; i++) {
                console.log(favoriteCoinsKeys[i])
                promises.push(coinService.getCoinMarketChart(favoriteCoinsKeys[i], 7))
            }
            Promise.all(promises).then(res => {
                for (let i = 0; i < res.length; i++) {
                    favoriteCoins[favoriteCoinsKeys[i]]["priceLabel"] = []
                    favoriteCoins[favoriteCoinsKeys[i]]["prices"] = []
                    res[i].data.prices.forEach(price => {
                        favoriteCoins[favoriteCoinsKeys[i]]["priceLabel"].push(new Date(price[0]).toString())
                        favoriteCoins[favoriteCoinsKeys[i]]["prices"].push(price[1])
                    })

                }
            }).catch(err => {
                console.log(err.response)
            }).finally(() => setCoins(Object.values(favoriteCoins)))
        }
    }, [favoriteCoins])

    return (
        <div className='coin-list'>
            {coins.length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h %</th>
                            <th>Total volume</th>
                            <th>Graphic</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        {coins.map(coin => (
                            <tr key={coin.id}>
                                <td><FavoriteIcon favoriteCoin={favoriteCoins[coin.id]} handleClick={() => handleToggleFavorite(coin)} /></td>
                                <td className='flex-align-center'>
                                    <img className='coin-img' src={coin.image} alt="" width={25} height={25} />
                                    <span>{coin.name}</span>
                                    <span className='symbol'>({coin.symbol})</span>
                                </td>
                                <td>{formatter.format(coin.current_price)}</td>
                                <td className='flex-align-center'>
                                    <div className={`arrow ${coin.price_change_percentage_24h > 0 ? 'arrow-up' : 'arrow-down'}`}></div>
                                    <span className={`${coin.price_change_percentage_24h > 0 ? 'green' : 'red'}`}>{coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : "No Data"}%</span>

                                </td>
                                <td>{formatter.format(coin.total_volume)}</td>
                                <td className='graphic-container'><LineChart chartOptions={chartOptions} label={coin["priceLabel"]} data={coin["prices"]} width={200} height={50} /></td>
                                <td><Link to={`/coindetails/${coin.id}`} className='btn'>Detay</Link></td>
                            </tr>
                        ))}
                    </tbody>

                </table> : <span>No coin</span>}
            {/*coins.length > 0 ?
                coins.map(coin => <Coin key={coin.id} coin={coin} />)
    : <span>No coin</span>*/}
        </div>
    )
}

export default FavoriteCoinList
