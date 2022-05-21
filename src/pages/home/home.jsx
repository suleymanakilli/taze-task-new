import React, { useEffect, useState } from 'react';
import './home.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import CoinList from '../../components/coinList/coinList';
import { fetchCoinsStartAsync } from '../../redux/coins/coinAction';
import Pagination from '../../components/pagination/pagination';
import Spinner from '../../components/spinner/spinner';
import SearchBox from '../../components/searchBox/searchBox';
import { toggleFavoriteCoin } from '../../redux/favoriteCoins/favoriteCoinsAction';
import FavoriteCoinList from '../../components/coinList/favoriteCoinList';

const coinNumbersPerPage = 100;
function Home() {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const coinState = useSelector(state => state.coins)

    const [filterText, setFilterText] = useState("")
    const [pageNumber, setPageNumber] = useState(1)
    const [filteredCoins, setFilteredCoins] = useState(coinState.coins)



    //get coins whenever page changes
    useEffect(() => {
        dispatch(fetchCoinsStartAsync(pageNumber, coinNumbersPerPage))
    }, [dispatch, pageNumber])

    //update filtered coins
    useEffect(() => {
        if (coinState.coins) {
            setFilteredCoins(coinState.coins.filter(el => el.id.includes(filterText)))
        }
    }, [filterText, coinState])

    //add to favorites or remove from favorites
    const handleToggleFavorite = (coin) => {
        dispatch(toggleFavoriteCoin(coin))
    }

    //handle enter press for input
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleNavigate()
        }
    }

    //navigate to detail page
    const handleNavigate = () => {
        if (filterText) {
            navigate(`/coindetails/${filterText}`)
        }
    }

    //set page number after click
    const handlePageClick = (event) => {
        setPageNumber(event.selected + 1)
    };

    //change filter text on input change
    const handleChangeSearchInput = e => {
        setFilterText(e.target.value)
    }


    return (
        <div className="home-page flow-content">
            <SearchBox
                handleChange={handleChangeSearchInput}
                handleKeyPress={handleKeyPress}
                handleClick={handleNavigate}
                value={filterText}
            />
            <div className='favorite-coins-container'>
                <h2 className='center title'>Favorite Coins</h2>
                <FavoriteCoinList handleToggleFavorite={handleToggleFavorite} />
            </div>
            {coinState.isFetching ? <Spinner /> :
                filteredCoins ?
                    <div className='all-coins-container'>

                        <h2 className='center title'>All Coins</h2>
                        <CoinList coins={filteredCoins} handleToggleFavorite={handleToggleFavorite} />
                    </div>
                    : <h1>No coins</h1>

            }
            <div className='pagination-container'>
                <Pagination
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(localStorage.getItem('coinsLength') / coinNumbersPerPage) || 1}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>


        </div>
    );
}

export default Home;