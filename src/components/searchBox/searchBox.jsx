import React from 'react'
import SearchIcon from '../../assets/searchIcon'
import './searchBox.css'
function SearchBox({ handleKeyPress, handleClick, value, handleChange }) {
    return (
        <div className='search-box'>
            <input className='search-input' type="text" placeholder='Search by coin id'
                onChange={handleChange}
                value={value}
                onKeyPress={handleKeyPress} />
            <SearchIcon handleClick={handleClick} />
        </div>
    )
}

export default SearchBox