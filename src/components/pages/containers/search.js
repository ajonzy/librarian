import React, { useState } from 'react'

import Search from "../pages/search/search"
import SearchResults from "../pages/search/search-results"

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
                <SearchResults
                    user={props.user}
                    searchInput={searchInput.toLowerCase()}
                    setDisplay={setDisplay}
                />
            )
        }
    }

    return (
        <div className='search-wrapper'>
            {renderDisplay()}
        </div>
    )
}