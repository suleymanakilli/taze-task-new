import React from 'react'
import './coinList.css'
import FavoriteIcon from '../../assets/favoriteIcon'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

function CoinList({ coins, handleToggleFavorite }) {
    const favoriteCoins = useSelector(state => state.favoriteCoins.favoriteCoins)

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
                                <td ><Link to={`/coindetails/${coin.id}`} className='btn'>Detay</Link></td>
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

export default CoinList
