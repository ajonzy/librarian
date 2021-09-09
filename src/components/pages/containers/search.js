import React, { useState } from 'react'

import Search from "../pages/search/search"

export default function book(props) {
    const [display, setDisplay] = useState("search")
    const [searchInput, setSearchInput] = useState("")
    
    const renderDisplay = () => {
        switch(display) {
            case "search": return (
                <Search
                    user={props.user}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    setDisplay={setDisplay}
                />
            )
            case "search-results": return (
                <div>{console.log(searchInput)}</div>
            )
        }
    }

    return (
        <div className='search-wrapper'>
            {renderDisplay()}
        </div>
    )
}