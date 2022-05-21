
import React, { useEffect, useState } from 'react'
import './coinDetails.css'
import { useParams } from 'react-router-dom'
import LineChart from '../../components/lineChart/lineChart'
import CoinService from '../../services/coinService'
import Spinner from '../../components/spinner/spinner'

let coinService = new CoinService();
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
function CoinDetails() {

    let { id } = useParams()

    const [selectedValue, setSelectedValue] = useState(1)
    const [label, setLabel] = useState([])
    const [data, setData] = useState([])
    const [coinDetails, setCoinDetails] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        setIsFetching(true)
        coinService.getCoinDetails(id).then(result => setCoinDetails(result.data)).finally(setIsFetching(false))
    }, [id])

    useEffect(() => {
        let priceLabel = []
        let prices = []
        setIsFetching(true)
        coinService.getCoinMarketChart(id, selectedValue).then(result => {
            result.data.prices.forEach(price => {
                priceLabel.push(new Date(price[0]).toLocaleDateString("en-US"))
                prices.push(price[1])
            })
            setLabel(priceLabel)
            setData(prices)
        }).catch(err => {
            setErrorMessage(err.response.data.error)
        }).finally(setIsFetching(false))
    }, [id, selectedValue])


    return (
        <div className='coin-details'>
            {isFetching ?
                <Spinner /> :
                Object.keys(coinDetails).length === 0 ? <h1>{errorMessage}</h1> :
                    <div className='flow-content'>
                        <div className='btn-container'>
                            <button onClick={() => setSelectedValue(1)} className={`btn ${selectedValue === 1 ? 'btn-active' : null}`}>1d</button>
                            <button onClick={() => setSelectedValue(7)} className={`btn ${selectedValue === 7 ? 'btn-active' : null}`}>7d</button>
                            <button onClick={() => setSelectedValue(30)} className={`btn ${selectedValue === 30 ? 'btn-active' : null}`}>30d</button>
                            <button onClick={() => setSelectedValue(365)} className={`btn ${selectedValue === 365 ? 'btn-active' : null}`}>365d</button>
                        </div>
                        <LineChart title={coinDetails.name} label={label} data={data} />
                        <img src={coinDetails.image?.small} alt="" />
                        <h1>{coinDetails.name}</h1>

                        <div className='description' dangerouslySetInnerHTML={{ __html: coinDetails.description.en }} />
                        <p><strong>Market Cap: </strong>{formatter.format(coinDetails.market_data.market_cap.usd)}</p>
                        <p><strong>24 Hours Highest: </strong>{formatter.format(coinDetails.market_data.high_24h.usd)}</p>
                        <p><strong>24 Hours Lowest: </strong>{formatter.format(coinDetails.market_data.low_24h.usd)}</p>
                    </div>
            }
        </div>

    )
}

export default CoinDetails
