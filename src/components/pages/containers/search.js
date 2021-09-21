import React, { useState } from 'react'

import Search from "../pages/search/search"
import SearchResults from "../pages/search/search-results"

export default function search(props) {
    const [display, setDisplay] = useState("search")
    const [searchInput, setSearchInput] = useState("")

    const handleSearchCancel = () => {
        setSearchInput("")
        setDisplay("search")
    }
    
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
                    updateUser={props.updateUser}
                    searchInput={searchInput.toLowerCase().trim()}
                    setDisplay={handleSearchCancel}
                    handleViewBook={props.handleViewBook}
                    handleEditSeries={props.handleEditSeries}
                    handleEditShelf={props.handleEditShelf}
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