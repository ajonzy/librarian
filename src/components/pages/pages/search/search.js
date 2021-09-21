import React, { useState } from 'react'

import Autosuggest from "../../../utitlities/autosuggest"

import loadingImg from "../../../../../static/assets/loading-small.gif"

export default function editSeries({ user, searchInput, setSearchInput, setDisplay }) {
    const [error, setError] = useState("")

    const titles = user.books.map(book => book.title)
    const authors = user.books.map(book => book.author)
    const series = user.series.map(series => series.name)
    const shelves = user.shelves.map(shelf => shelf.name)

    const handleSearch = (event) => {
        event.preventDefault()

        if (searchInput === "") {
            setError("Please enter an item to search for")
        }
        else {
            setDisplay("search-results")
        }
    }

    return (
        <form onSubmit={handleSearch}>
            <Autosuggest
                input={searchInput}
                setInput={setSearchInput}
                suggestions={[...titles, ...authors, ...series, ...shelves]}
                placeholder="Search"
            />
            <button type="submit">Search</button>
            <div className="error-loading">{error}{loading ? <img src={loadingImg} /> : null}</div>
        </form>
    )
}