import React from 'react'
function SearchIcon({ handleClick }) {
  return (
    <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" height="16px" width="16px"
      viewBox="0 0 24 24">
      <path d="M16.4153 16.4153L20 20M18.5455 11.2727C18.5455 15.2893 15.2894 18.5454 11.2728 18.5454C7.25612 18.5454
        4 15.2893 4 11.2727C4 7.2561 7.25612 4 11.2728 4C15.2894 4 18.5455 7.2561 18.5455 11.2727Z"
        stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
  )
}

export default SearchIcon