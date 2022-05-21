import React from 'react'
import './pagination.css'
import ReactPaginate from 'react-paginate'

function Pagination({ handlePageClick, ...otherProps }) {
    return (
        <div className='react-pagination'>
            <ReactPaginate

                onPageChange={handlePageClick}
                {...otherProps}
            />
        </div>

    )
}

export default Pagination
